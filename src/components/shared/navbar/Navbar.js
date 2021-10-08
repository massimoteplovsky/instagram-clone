import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useNavbarStyles } from '../../../styles';
import { AppBar } from '@material-ui/core';

// Components
import Logo from './Logo';
import Search from './Search';
import Links from './Links';
import Progress from './Progress';

const Navbar = () => {
  const classes = useNavbarStyles();
  const history = useHistory();
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const path = history.location.pathname;

  useEffect(() => {
    setIsLoadingPage(false);
  }, [path]);

  return (
    <>
      <Progress isAnimating={isLoadingPage} />
      <AppBar className={classes.appBar}>
        <section className={classes.section}>
          <Logo />
          <Search history={history} />
          <Links path={path} />
        </section>
      </AppBar>
    </>
  );
};

export default Navbar;
