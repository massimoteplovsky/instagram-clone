import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useApolloClient } from '@apollo/react-hooks';
import {
  Card,
  CardHeader,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from '@material-ui/core';
import isEmail from 'validator/lib/isEmail';
import { useLoginPageStyles } from '../styles';
import { Path } from '../consts';
import { AuthContext } from '../context';
import { GET_USER_EMAIL } from '../graphql/queries';

// Components
import SEO from '../components/shared/Seo';
import LoginWithFacebook from '../components/shared/LoginWithFacebook';
import FormError from '../components/shared/FormError';

const LoginPage = () => {
  const cx = useLoginPageStyles();
  const { loginWithEmailAndPassword } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm({ mode: 'onBlur' });
  const [formError, setFormError] = useState(null);
  const history = useHistory();
  const client = useApolloClient();
  const hasPassword = !!watch('password', false);

  const onSubmit = async ({ enter, password }) => {
    try {
      if (!isEmail(enter)) {
        const variables = { input: enter };
        const { data } = await client.query({
          query: GET_USER_EMAIL,
          variables,
        });

        enter = data.users[0]?.email || 'www.dummyemail@mail.ru';
      }

      await loginWithEmailAndPassword(enter, password);
      setFormError(null);
      history.push(Path.DASHBOARD);
    } catch (error) {
      setFormError(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <SEO title="Login" />
      <section className={cx.section}>
        <article>
          <Card className={cx.card}>
            <CardHeader className={cx.cardHeader} />
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormError error={formError} />
              <TextField
                fullWidth
                variant="filled"
                label="Username, Phone Number, Email"
                margin="dense"
                className={cx.textField}
                {...register('enter', {
                  required: true,
                  minLength: 5,
                })}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Password"
                margin="dense"
                className={cx.textField}
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: true,
                  minLength: 6,
                })}
                InputProps={{
                  endAdornment: hasPassword && (
                    <InputAdornment>
                      <Button onClick={togglePasswordVisibility}>
                        {showPassword ? 'Hide' : 'Show'}
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                disabled={!isValid || isSubmitting}
                variant="contained"
                fullWidth
                color="primary"
                className={cx.button}
                type="submit"
              >
                Log In
              </Button>
            </form>
            <div className={cx.orContainer}>
              <div className={cx.orLine} />
              <div>
                <Typography variant="body2" color="textSecondary">
                  OR
                </Typography>
              </div>
              <div className={cx.orLine} />
            </div>
            <LoginWithFacebook color="secondary" iconColor="blue" />
            <Button fullWidth color="secondary">
              <Typography variant="caption">Forgot password?</Typography>
            </Button>
          </Card>
          <Card className={cx.signUpCard}>
            <Typography align="right" variant="body2">
              Don't have an account?
            </Typography>
            <Link to={Path.SIGNUP}>
              <Button color="primary" className={cx.signUpButton}>
                Sign up
              </Button>
            </Link>
          </Card>
        </article>
      </section>
    </>
  );
};

export default LoginPage;
