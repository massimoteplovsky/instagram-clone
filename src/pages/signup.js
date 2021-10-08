import React from 'react';
import { useSignUpPageStyles } from '../styles';
import SEO from '../components/shared/Seo';
import { Card, Typography, TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

// Components
import LoginWithFacebook from '../components/shared/LoginWithFacebook';

const SignUpPage = () => {
  const cx = useSignUpPageStyles();
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
            <form>
              <TextField
                fullWidth
                variant="filled"
                label="Email"
                type="email"
                margin="dense"
                className={cx.textField}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Full Name"
                margin="dense"
                className={cx.textField}
              />
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
                type="password"
                margin="dense"
                className={cx.textField}
                autoComplete="new-password"
              />
              <Button
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
            <Link to="/accounts/login">
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
