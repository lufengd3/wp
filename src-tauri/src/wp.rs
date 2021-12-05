use std::fs::File;
use std::io::copy;
use std::env;
use wallpaper;
use reqwest;
use rand::Rng;

#[tauri::command(async)]
pub async fn update_wallpaper(url: String) {
  let download_result = download_img(&url).await;

  match download_result {
    Ok(filepath) => {
      let wp_res = wallpaper::set_from_path(&filepath);
      match wp_res {
        Ok(data) => {
          println!("success {:?}", data);
        },
        Err(e) => {
          println!("error {:?}", e);
        }
      }
      // return Ok(());
    },
    Err(_) => {
      println!("error");
    }
  }

  // Ok(())
}

async fn download_img(url: &str) -> Result<String, Box<dyn std::error::Error>> {
    println!("downloading... {} \n", url);
    let res = reqwest::get(url).await?.bytes().await?;
    let mut data = res.as_ref();

    let mut rng = rand::thread_rng();
    let random_n: u32 = rng.gen();
    let random_str = random_n.to_string();
    let file_name = format!("{}.jpg", random_str);
    let tmp_dir = env::temp_dir();
    let tmp_file_path = tmp_dir.join(file_name);
    let file_path = tmp_file_path.to_str().unwrap();
    println!("create file at {} \n", file_path);
    let mut f = File::create(&file_path)?;
    
    copy(&mut data, &mut f)?;

    // let cwd = env::current_dir().unwrap();
    // let mut file_path = String::from(cwd.into_os_string().into_string().unwrap());
    // let mut file_name = String::from(&random_str);
    // file_name.insert_str(0, "/");
    // file_name.push_str(".jpg");
    // file_path.push_str(&file_name);
    println!("file_path {} \n", file_path);
    
    Ok(file_path.to_string())
}