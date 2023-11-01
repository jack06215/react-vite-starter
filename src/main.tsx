import { RouterProvider } from 'providers/RouterProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import smoothscroll from 'smoothscroll-polyfill';

import './assets/styles/global.scss';
import './assets/styles/application.scss';

smoothscroll.polyfill();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider />
    </RecoilRoot>
  </React.StrictMode>,
);
