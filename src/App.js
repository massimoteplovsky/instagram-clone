import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Path } from './consts';

// Pages
import FeedPage from './pages/feed';
import ExplorePage from './pages/explore';
import ProfilePage from './pages/profile';
import PostPage from './pages/post';
import EditProfilePage from './pages/edit-profile';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';
import NotFoundPage from './pages/not-found';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={Path.DASHBOARD} component={FeedPage} />
        <Route path={Path.EXPLORE} component={ExplorePage} />
        <Route exact path={Path.ACCOUNT()} component={ProfilePage} />
        <Route exact path={Path.POST()} component={PostPage} />
        <Route path={Path.EDIT} component={EditProfilePage} />
        <Route path={Path.LOGIN} component={LoginPage} />
        <Route path={Path.SIGNUP} component={SignUpPage} />
        <Route path={Path.DEFAULT} component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default App;
