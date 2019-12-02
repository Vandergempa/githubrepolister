import React, { Fragment } from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Landing from '../components/Landing'
import ReposList from '../components/ReposList'
import RepoInfo from '../components/RepoInfo'
import Footer from '../components/Footer'

export const history = createBrowserHistory();

const AppRouter = () => (
  // The component we put on top of the Routes will be visible all time!
  <Fragment>
    <Router history={history}>
      <Fragment>
        <Route path="/" component={Landing} exact={true} />
        <Route path="/reposlist" component={ReposList} />
        <Route path="/repoinfo" component={RepoInfo} />
      </Fragment>
    </Router>
    <Footer />
  </Fragment>
);

export default AppRouter;