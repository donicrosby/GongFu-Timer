import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import Helmet from 'react-helmet';
import Favicons from './Favicons';
import Overview from './Overview';
import Edit from './Edit';
import Timer from './Timer';

const App = () => (
  <BrowserRouter>
    <div>
      <Helmet defaultTitle="GongFu Timer"/>
      { Favicons }

      <Route exact path="/" component={Overview}/>
      <Route path="/edit/:teaId?" component={Edit}/>
      <Route path="/timer" component={Timer}/>
    </div>
  </BrowserRouter>
);

export default App;
