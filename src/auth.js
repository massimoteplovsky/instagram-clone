import { useMutation } from '@apollo/react-hooks';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import React, { useState, useEffect } from 'react';
import { CREATE_USER } from './graphql/mutations';
import defaultImage from './images/default-user-image.jpg';
import { AuthContext } from './context';

const provider = new firebase.auth.FacebookAuthProvider();

// Find these options in your Firebase console
firebase.initializeApp({
  apiKey: 'AIzaSyCTJFoRvEvE2L982rLWaoVN43hQT0BaWtE',
  authDomain: 'instagram-react1.firebaseapp.com',
  databaseURL: 'https://instagram-react1-default-rtdb.firebaseio.com/',
  projectId: 'instagram-react1',
  storageBucket: 'instagram-react1.appspot.com',
  messagingSenderId: '963766776560',
  appId: '1:963766776560:web:3e6c7a7fc9ac770b3a8835',
});

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ status: 'loading' });
  const [createUser] = useMutation(CREATE_USER);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        const idTokenResult = await user.getIdTokenResult();
        const hasuraClaim =
          idTokenResult.claims['https://hasura.io/jwt/claims'];

        if (hasuraClaim) {
          setAuthState({ status: 'in', user, token });
        } else {
          // Check if refresh is required.
          const metadataRef = firebase
            .database()
            .ref('metadata/' + user.uid + '/refreshTime');

          metadataRef.on('value', async (data) => {
            if (!data.exists) return;
            // Force refresh to pick up the latest custom claims changes.
            const token = await user.getIdToken(true);
            setAuthState({ status: 'in', user, token });
          });
        }
      } else {
        setAuthState({ status: 'out' });
      }
    });
  }, []);

  const signInWithFacebook = async () => {
    const data = await firebase.auth().signInWithPopup(provider);
    console.log(data, 'data');
  };

  const signOut = async () => {
    setAuthState({ status: 'loading' });
    await firebase.auth().signOut();
    setAuthState({ status: 'out' });
  };

  const loginWithEmailAndPassword = async (email, password) => {
    const userData = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    return userData;
  };

  const signUpWithEmailAndPassword = async ({
    email,
    password,
    name,
    username,
  }) => {
    const userData = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    if (userData.additionalUserInfo.isNewUser) {
      const variables = {
        bio: '',
        email: userData.user.email,
        name,
        phoneNumber: '',
        profileImage: defaultImage,
        userId: userData.user.uid,
        username,
        website: '',
      };
      await createUser({ variables });
    }
  };

  const updateEmail = async (email) => {
    await authState.user.updateEmail(email);
  };

  if (authState.status === 'loading') return null;

  return (
    <AuthContext.Provider
      value={{
        authState,
        signInWithFacebook,
        signUpWithEmailAndPassword,
        signOut,
        loginWithEmailAndPassword,
        updateEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
