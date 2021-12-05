import { atom, selector } from 'recoil';
import { updateRemoteUrl } from '../utils/api';

export const wpUrl = atom({
  key: 'wpUrl', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

export const wpUrlSelector = selector({
  key: 'wpUrlSelector',
  get: ({ get }) => get(wpUrl),
  set: ({ set }, newValue) => {
    set(wpUrl, newValue);
    updateRemoteUrl(newValue);
  }
});

export const wpKeyword = atom({
  key: 'wpKeyword',
  default: localStorage.getItem('keyword') || 'wallpaper',
});

export const wpKeywordSelector = selector({
  key: 'wpKeywordSelector',
  get: ({ get }) => get(wpKeyword),
  set: ({ set }, newValue) => {
    localStorage.setItem('keyword', newValue);
    set(wpKeyword, newValue);
  }
});