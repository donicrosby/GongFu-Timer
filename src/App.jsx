import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Helmet from 'react-helmet';
import Favicons from './Favicons';
import Overview from './Overview';
import Edit from './Edit';
import Timer from './Timer';

const NoMatch = ({location}) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
);

const App = () => (
  <BrowserRouter>
    <div>
      <Helmet defaultTitle="GongFu Timer"/>
      { Favicons }

      <Switch>
        <Route exact path="/" component={Overview}/>
        <Route path="/edit/:teaId?" component={Edit}/>
        <Route path="/timer/:teaId" component={Timer}/>
        <Route component={NoMatch}/>
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
