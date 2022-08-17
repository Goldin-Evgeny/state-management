import * as ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
