import '@emotion/react';
import { MyTheme } from 'constants/theme';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MyTheme {}
}
