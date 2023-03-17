import { ConfigProvider, theme } from 'antd';
import { RouterProvider } from 'react-router-dom';

import './config/i18n';
import { router } from './routes';
import { themeConfig } from './config/theme';
import { useAppSelector } from './app/hooks';
const { defaultAlgorithm, darkAlgorithm } = theme;

function App() {
  const { theme } = useAppSelector((store) => store.auth);

  return (
    <ConfigProvider
      theme={{ algorithm: theme === themeConfig.DARK ? darkAlgorithm : defaultAlgorithm }}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}
export default App;
