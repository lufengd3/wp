import { render, unmountComponentAtNode } from 'react-dom';
import './index.css';

const loadingRoot = document.getElementById('loading');

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );
}

Loading.show = () => {
  render(<Loading />, loadingRoot);
}

Loading.hide = () => {
  unmountComponentAtNode(loadingRoot);
}

window.loading = Loading;