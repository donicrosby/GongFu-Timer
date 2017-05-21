import React from 'react';
import { render } from 'react-snapshot';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';

render(<App />, document.getElementById('root'));
registerServiceWorker();
