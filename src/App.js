import React, { useEffect, useRef, useContext } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Path } from './consts';
import { AuthContext } from './auth';

// Pages
import FeedPage from './pages/feed';
import ExplorePage from './pages/explore';
import ProfilePage from './pages/profile';
import PostPage from './pages/post';
import EditProfilePage from './pages/edit-profile';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';
import NotFoundPage from './pages/not-found';

// Components
import PostModal from './components/post/PostModal';

const App = () => {
  const history = useHistory();
  const { authState } = useContext(AuthContext);
  const prevLocation = useRef(history.location);
  const modal = history.location.state?.modal;
  const isAuth = authState.status === 'in';

  useEffect(() => {
    if (history.action !== 'POP' && !modal) {
      prevLocation.current = history.location;
    }
  }, [modal, history.location, history.action]);

  const isModalOpen = modal && prevLocation.current !== history.location;

  return (
    <>
      <Switch location={isModalOpen ? prevLocation.current : history.location}>
        <Route exact path={Path.DASHBOARD} component={FeedPage} />
        <Route path={Path.EXPLORE} component={ExplorePage} />
        <Route exact path={Path.ACCOUNT()} component={ProfilePage} />
        <Route exact path={Path.POST()} component={PostPage} />
        <Route path={Path.EDIT} component={EditProfilePage} />
        <Route path={Path.LOGIN} component={LoginPage} />
        <Route path={Path.SIGNUP} component={SignUpPage} />
        <Route path={Path.DEFAULT} component={NotFoundPage} />
      </Switch>
      {isModalOpen && <Route exact path={Path.POST()} component={PostModal} />}
    </>
  );
};

export default App;
