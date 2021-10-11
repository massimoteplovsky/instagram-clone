import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSignUpPageStyles } from '../styles';
import SEO from '../components/shared/Seo';
import { Card, Typography, TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth';
import { Path } from '../consts';

// Components
import LoginWithFacebook from '../components/shared/LoginWithFacebook';

const SignUpPage = () => {
  const cx = useSignUpPageStyles();
  const { signUpWithEmailAndPassword } = useContext(AuthContext);
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    username: '',
    password: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    await signUpWithEmailAndPassword(formData);
    history.push(Path.DASHBOARD);
  };

  const handleChangeFormData = ({ target }) => {
    const { name, value } = target;
    setFormData((formData) => ({ ...formData, [name]: value }));
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
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                variant="filled"
                label="Email"
                type="email"
                margin="dense"
                name="email"
                onChange={handleChangeFormData}
                className={cx.textField}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Full Name"
                margin="dense"
                name="name"
                onChange={handleChangeFormData}
                className={cx.textField}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Username"
                margin="dense"
                name="username"
                onChange={handleChangeFormData}
                className={cx.textField}
                autoComplete="username"
              />
              <TextField
                fullWidth
                variant="filled"
                label="Password"
                type="password"
                margin="dense"
                name="password"
                onChange={handleChangeFormData}
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
