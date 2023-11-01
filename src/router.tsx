import App from 'App';
import { createBrowserRouter } from 'react-router-dom';
import { routes } from 'router.const';

export const router = createBrowserRouter([
  {
    path: routes.root.root,
    element: <App />,
  },
]);
