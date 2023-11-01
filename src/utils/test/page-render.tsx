import {
  queries,
  Queries,
  render,
  RenderOptions,
} from '@testing-library/react';
import { ThemeProvider } from 'providers/ThemeProvider';
import { MemoryRouter } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const PageProvider: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider>
      <MemoryRouter>{children}</MemoryRouter>
    </ThemeProvider>
  );
};

export function pageRender<
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container,
>(ui: JSX.Element, options?: RenderOptions<Q, Container, BaseElement>) {
  render(ui, { wrapper: PageProvider, ...options });
}
