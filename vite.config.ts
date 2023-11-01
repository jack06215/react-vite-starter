import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, `${process.cwd()}/config/environments`);

  // expose .env.[mode] as process.env instead of import.meta since jest does not import meta yet
  const envWithProcessPrefix = Object.entries(env).reduce(
    (prev, [key, val]) => {
      return {
        ...prev,
        ['process.env.' + key]: `"${val}"`,
      };
    },
    {},
  );
  return {
    base: '/space',
    define: {
      ...envWithProcessPrefix,
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
    server: {
      port: 8081,
    },
    plugins: [tsConfigPaths(), react({ jsxImportSource: '@emotion/react' })],
  };
});
