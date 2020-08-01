/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { createMuiTheme } from '@material-ui/core/styles';
import {
  createGenerateClassName,
  jssPreset,
  StylesProvider,
  ThemeProvider
} from '@material-ui/styles';
import '@styles/index.scss';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';
import rtl from 'jss-rtl';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { sessionService } from 'redux-react-session';
import 'typeface-muli';
import { History } from 'history';
import AppContext from './AppContext';
import MainLayout from './layouts/MainLayout';
import i18n from './providers/i18n';
import routes from './routes';
import store from './store';

sessionService.initSessionService(store);
const insertionPoint: any = document.getElementById('jss-insertion-point');
const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins, jssExtend(), rtl()],
  insertionPoint
});
const generateClassName = createGenerateClassName();
const muiTheme = createMuiTheme({});

export default ({ history }: { history: History }) => (
  <AppContext.Provider
    value={{
      routes
    }}
  >
    <StylesProvider jss={jss} generateClassName={generateClassName}>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={muiTheme}>
            <Router history={history}>
              <MainLayout />
            </Router>
          </ThemeProvider>
        </I18nextProvider>
      </Provider>
    </StylesProvider>
  </AppContext.Provider>
);
