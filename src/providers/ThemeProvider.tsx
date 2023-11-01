import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';

const muiTheme = createTheme();

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>;
};
