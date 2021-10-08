import React from 'react';
import { useLoginPageStyles } from '../styles';

import {
  Card,
  CardHeader,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

// Components
import SEO from '../components/shared/Seo';
import LoginWithFacebook from '../components/shared/LoginWithFacebook';

const LoginPage = () => {
  const cx = useLoginPageStyles();

  return (
    <>
      <SEO title="Login" />
      <section className={cx.section}>
        <article>
          <Card className={cx.card}>
            <CardHeader className={cx.cardHeader} />
            <form>
              <TextField
                fullWidth
                variant="filled"
                label="Username"
                margin="dense"
                className={cx.textField}
                autoComplete="username"
              />
              <TextField
                fullWidth
                variant="filled"
                label="Password"
                margin="dense"
                className={cx.textField}
                autoComplete="current-password"
                type="password"
              />
              <Button
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
            <Link to="/accounts/emailsignup">
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
