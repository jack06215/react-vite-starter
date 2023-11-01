import {
  queries,
  Queries,
  render,
  RenderOptions,
} from '@testing-library/react';
import { ThemeProvider } from 'providers/ThemeProvider';

type Props = {
  children: React.ReactNode;
};

const _ThemeProvider: React.FC<Props> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export function themeRender<
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container,
>(ui: JSX.Element, options?: RenderOptions<Q, Container, BaseElement>) {
  render(ui, { wrapper: _ThemeProvider, ...options });
}
