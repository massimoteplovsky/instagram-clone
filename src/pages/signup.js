import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useSignUpPageStyles } from '../styles';
import {
  Card,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from '@material-ui/core';
import { HighlightOff, CheckCircleOutline } from '@material-ui/icons';
import { AuthContext } from '../context';
import { Path } from '../consts';
import isEmail from 'validator/lib/isEmail';
import { CHECK_IF_USERNAME_TAKEN } from '../graphql/queries';

// Components
import LoginWithFacebook from '../components/shared/LoginWithFacebook';
import SEO from '../components/shared/Seo';
import FormError from '../components/shared/FormError';

const SignUpPage = () => {
  const cx = useSignUpPageStyles();
  const client = useApolloClient();
  const [formError, setFormError] = useState(null);
  const { signUpWithEmailAndPassword, signInWithFacebook } = useContext(
    AuthContext
  );
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, touchedFields },
  } = useForm({ mode: 'onBlur' });

  const errorIcon = (
    <InputAdornment>
      <HighlightOff style={{ color: 'red', height: 30, width: 30 }} />
    </InputAdornment>
  );

  const validIcon = (
    <InputAdornment>
      <CheckCircleOutline style={{ color: '#ccc', height: 30, width: 30 }} />
    </InputAdornment>
  );

  const onSubmit = async (formData) => {
    try {
      setFormError(null);
      await signUpWithEmailAndPassword(formData);
      history.push(Path.DASHBOARD);
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleErrors = (error) => {
    if (error.message.includes('users_username_key')) {
      return setFormError('Username is already taken');
    }

    setFormError(error.message);
  };

  const validateUsername = async (username) => {
    const variables = { username };
    const { data } = await client.query({
      query: CHECK_IF_USERNAME_TAKEN,
      variables,
    });

    return data.users.length === 0;
  };

  const handleSigninWithFacebook = async () => {
    try {
      await signInWithFacebook();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SEO title="Sign up" />
      <section className={cx.section}>
        <article>
          <Card className={cx.card}>
            <div className={cx.cardHeader} />
            <Typography className={cx.cardHeaderSubHeader}>
              Sign up to see photos and videos from your friends.
            </Typography>
            <LoginWithFacebook
              color="primary"
              iconColor="white"
              variant="contained"
              onLogin={handleSigninWithFacebook}
            />
            <div className={cx.orContainer}>
              <div className={cx.orLine} />
              <div>
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </div>
              <div className={cx.orLine} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormError error={formError} />
              <TextField
                fullWidth
                variant="filled"
                label="Email"
                type="email"
                margin="dense"
                name="email"
                {...register('email', {
                  required: true,
                  validate: (value) => isEmail(value),
                })}
                InputProps={{
                  endAdornment: errors.email
                    ? errorIcon
                    : touchedFields.email && validIcon,
                }}
                className={cx.textField}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Full Name"
                margin="dense"
                name="name"
                {...register('name', {
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                })}
                InputProps={{
                  endAdornment: errors.name
                    ? errorIcon
                    : touchedFields.name && validIcon,
                }}
                className={cx.textField}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Username"
                margin="dense"
                name="username"
                {...register('username', {
                  required: true,
                  minLength: 5,
                  maxLength: 20,
                  pattern: /^[a-zA-Z0-9_.]*$/,
                  validate: async (value) => validateUsername(value),
                })}
                InputProps={{
                  endAdornment: errors.username
                    ? errorIcon
                    : touchedFields.username && validIcon,
                }}
                className={cx.textField}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Password"
                type="password"
                margin="dense"
                name="password"
                {...register('password', {
                  required: true,
                  minLength: 6,
                })}
                InputProps={{
                  endAdornment: errors.password
                    ? errorIcon
                    : touchedFields.password && validIcon,
                }}
                className={cx.textField}
              />
              <Button
                disabled={!isValid || isSubmitting}
                variant="contained"
                fullWidth
                color="primary"
                className={cx.button}
                type="submit"
              >
                Sign Up
              </Button>
            </form>
          </Card>
          <Card className={cx.loginCard}>
            <Typography align="right" variant="body2">
              Have an account?
            </Typography>
            <Link to={Path.LOGIN}>
              <Button color="primary" className={cx.loginButton}>
                Log in
              </Button>
            </Link>
          </Card>
        </article>
      </section>
    </>
  );
};

export default SignUpPage;
