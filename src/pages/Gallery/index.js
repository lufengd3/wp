import { useState, useEffect, useRef } from 'react';
import './index.css';
import { invoke, fs } from '@tauri-apps/api';
import { createApi } from 'unsplash-js';
import { useRecoilState } from 'recoil';
import { wpKeywordSelector, wpUrl, wpUrlSelector } from '../../store/index';
import Loading from '../../components/Loading';
import { AK } from '../../config';

const DEFAULT_DURATION = 1000 * 60 * 25;
const REFRESH_IMG = 'data:image/png;base64,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';
const MAX_LOOP_COUNT = 40;

async function updateWallpaper(imgUrl) {
  console.log('click');
  const result = invoke('update_wallpaper', {
    // url: 'https://img.alicdn.com/imgextra/i2/1993922459/TB2SyrclmMmBKNjSZTEXXasKpXa_!!1993922459.jpg_430x430q90.jpg'
    url: imgUrl
  }).then(() => {
    console.log('success');
  }).catch((e) => {
    console.error(e);
  });
}

function save2db(result = []) {
  if (!/mac\ os/i.test(navigator.userAgent)) return;
  const data = result.map(item => item.urls);
  console.log(data);
  invoke('save2db', {
    data: JSON.stringify(data)
  });
}

function reset() {
  window.location.reload();
}

let cachedImgs = [];
try {
  cachedImgs = JSON.parse(localStorage.getItem('imgs')) || [];
} catch (e) {
  console.error(e);
}

function App() {
  const [url, setUrl] = useRecoilState(wpUrlSelector);
  const [keyword, setKeyword] = useRecoilState(wpKeywordSelector);
  const [imgs, setImgs] = useState(cachedImgs);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      if (imgs && imgs.length) {
        return;
      }
    }

    loadWp(keyword);
  }, [keyword]);

  function loadWp(keyword) {
    Loading.show();

    const unsplash = createApi({
      accessKey: AK,
    });

    unsplash.search.getPhotos({
      query: keyword,
      page: Math.floor((Math.random() + 1) * 100),
      perPage: 30,
      orientation: 'landscape',
    }).then((res) => {
      Loading.hide();
      
      const result = res?.response?.results ?? [];
      if (result.length) {
        setImgs(result);
        localStorage.setItem('imgs', JSON.stringify(result));

        feelLucky(result);
        setWallpaperIntermittently(result);
        save2db(result);
      } else {
        alert('换个搜索词吧')
        // throw new Error('no result');
      }
    }).catch((e) => {
      Loading.hide();

      const msg = e && e.message || 'Get photos error!';
      alert(msg)
      console.error(e);
      // reset();
    });
  }

  function setWallpaperIntermittently(imgs, time = DEFAULT_DURATION) {
    let loopCount = 0;

    const interval = setInterval(() => {
      feelLucky(imgs);
      loopCount++;
      if (loopCount > MAX_LOOP_COUNT) {
        clearInterval(interval);
      }
    }, time);
  }

  function feelLucky(imgs) {
    try {
      const index = Math.floor(Math.random() * imgs.length);
      const img = imgs[index];
      updateWallpaper(img.urls.full);
      setSelectedIndex(index);
    } catch (e) {
      console.error(e);
      console.log(imgs);
      // reset();
    }
  }

  function handleKeywordChange(e) {
    if(e.key === 'Enter') {
      console.log(e.target.value);
      setKeyword(e.target.value);
    }
  }

  return (
    <div className="App">
      <div className="header">
        <input className="search" type="text" placeholder={keyword} onKeyDown={handleKeywordChange} />
        <img onClick={() => { loadWp(keyword) }} className="refresh" src={REFRESH_IMG} />
      </div>
      {typeof selectedIndex === 'number' ? <div className="content">
        <img className="selected" src={imgs[selectedIndex].urls.full} />
      </div> : null}
      <div className="gallery">
        {imgs.map((item, i) => {
          const {full, raw, regular, small, thumb} = item.urls;
          return (
              <img key={i} src={regular} className="imgItem" onClick={() => {
                Loading.show();
                setTimeout(() => {
                  Loading.hide();
                }, 2000);
                setUrl(full);
                setSelectedIndex(i);
                updateWallpaper(full);
              }} />
          );
        })}
      </div>
    </div>
  );
}

export default App;