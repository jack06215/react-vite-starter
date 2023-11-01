import { Parameters, StoryFn } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '../src/providers/ThemeProvider';
import smoothscroll from 'smoothscroll-polyfill';
import '../src/assets/styles/global.scss';
import { MemoryRouter } from 'react-router-dom';

smoothscroll.polyfill();

export const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const withPageProvider = (StoryFn: StoryFn) => {
  return (
    <ThemeProvider>
      <MemoryRouter>
        <StoryFn />
      </MemoryRouter>
    </ThemeProvider>
  );
};

export const decorators = [withPageProvider];
