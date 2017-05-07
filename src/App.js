import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Home = () => (
  <div>
    <Title>Home</Title>
  </div>
)

const About = () => (
  <div>
    <Helmet title="About" />
    <Title>About</Title>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <Helmet title={match.params.topicId} />
    <Title>{match.params.topicId}</Title>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <Helmet title="Topics" />
    <Title>Topics</Title>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <Title>Please select a topic.</Title>
    )}/>
  </div>
)

const App = () => (
  <Router>
    <div>
      <Helmet defaultTitle="My Site" />

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)

export default App;
