import React, { useEffect, useRef, useContext } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Path, RouteProtection } from './consts';
import { AuthContext, UserContext } from './context';
import { useSubscription } from '@apollo/react-hooks';
import { GET_CURRENT_USER } from './graphql/subscriptions';

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
import ProtectedRoute from './components/shared/ProtectedRoute';
import LoadingScreen from './components/shared/LoadingScreen';

const App = () => {
  const history = useHistory();
  const { authState } = useContext(AuthContext);
  const prevLocation = useRef(history.location);
  const modal = history.location.state?.modal;
  const isAuth = authState.status === 'in';
  const userId = isAuth ? authState.user.uid : null;
  console.log(authState, 'App');
  const { data, loading } = useSubscription(GET_CURRENT_USER, {
    variables: { userId },
  });

  useEffect(() => {
    if (history.action !== 'POP' && !modal) {
      prevLocation.current = history.location;
    }
  }, [modal, history.location, history.action]);

  if (loading) return <LoadingScreen />;

  const isModalOpen = modal && prevLocation.current !== history.location;
  const currentUser = isAuth && data ? data.users[0] : null;

  console.log(currentUser, 'App component');

  return (
    <UserContext.Provider value={{ currentUser }}>
      <Switch location={isModalOpen ? prevLocation.current : history.location}>
        <ProtectedRoute
          path={Path.DASHBOARD}
          exact
          isAuth={isAuth}
          protectionType={RouteProtection.PROTECTED}
        >
          <FeedPage />
        </ProtectedRoute>

        <ProtectedRoute
          path={Path.EXPLORE}
          isAuth={isAuth}
          protectionType={RouteProtection.PROTECTED}
        >
          <ExplorePage />
        </ProtectedRoute>

        <ProtectedRoute
          exact
          path={Path.ACCOUNT()}
          isAuth={isAuth}
          protectionType={RouteProtection.PROTECTED}
        >
          <ProfilePage />
        </ProtectedRoute>

        <ProtectedRoute
          exact
          path={Path.POST()}
          isAuth={isAuth}
          protectionType={RouteProtection.PROTECTED}
        >
          <PostPage />
        </ProtectedRoute>

        <ProtectedRoute
          exact
          path={Path.EDIT}
          isAuth={isAuth}
          protectionType={RouteProtection.PROTECTED}
        >
          <EditProfilePage />
        </ProtectedRoute>

        <ProtectedRoute
          path={Path.LOGIN}
          isAuth={isAuth}
          protectionType={RouteProtection.SEMI_PROTECTED}
        >
          <LoginPage />
        </ProtectedRoute>

        <ProtectedRoute
          path={Path.SIGNUP}
          isAuth={isAuth}
          protectionType={RouteProtection.SEMI_PROTECTED}
        >
          <SignUpPage />
        </ProtectedRoute>

        <Route path={Path.DEFAULT} component={NotFoundPage} />
      </Switch>
      {isModalOpen && (
        <ProtectedRoute
          exact
          path={Path.POST()}
          isAuth={isAuth}
          protectionType={RouteProtection.PROTECTED}
        >
          <PostModal />
        </ProtectedRoute>
      )}
    </UserContext.Provider>
  );
};

export default App;
