'use client';

// The code has a few issues that need to be addressed:

// 1. The `Provider` component is being imported from 'react', which is incorrect. It should be imported from 'react-redux'.
// 2. The `Provider` component is being redefined, which will cause a conflict. Rename the custom `Provider` component to avoid this conflict.
// 3. The `children` prop should be destructured from the props object.

import React, { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';

const CustomProvider = ({ children }: { children: ReactNode }) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

export default CustomProvider;
