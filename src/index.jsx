import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {setupStore} from './slice/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import * as ReactDOMClient from 'react-dom/client';
import App from './App/App';

const store = setupStore();

const container = document.getElementById('root')
const root = ReactDOMClient.createRoot(container);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <CookiesProvider>
                <App/>
            </CookiesProvider>
        </BrowserRouter>
    </Provider>
);


