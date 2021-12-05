// use std::fs::File;
// use std::path::Path;
// use std::io;
// use std::env;
// use wallpaper;

mod wp;
mod commands;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![wp::update_wallpaper, commands::db::save2db])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}