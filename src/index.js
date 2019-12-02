import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Lista from './Lista';
import * as serviceWorker from './serviceWorker';
import {IntlProvider} from 'react-intl';
import localeEsMessages from './locales/es';
import localeEnMessages from './locales/en';
ReactDOM.render(
<IntlProvider locale={navigator.language} 
messages= {navigator.language.includes('en')? localeEnMessages:localeEsMessages}>
<Lista/> </IntlProvider>, document.getElementById('root'));

serviceWorker.register();