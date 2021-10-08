import React, { useState, useEffect } from 'react';
import { Grid, Hidden, InputBase, Avatar, Typography } from '@material-ui/core';
import { useNavbarStyles, WhiteTooltip } from '../../../styles';
import { getDefaultUser } from '../../../data';
import { Path } from '../../../consts';

// Components
import { LoadingIcon } from '../../../icons';

const Search = ({ history }) => {
  const cx = useNavbarStyles();
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (!query) {
      return setResult([]);
    }
    setResult(Array.from({ length: 3 }, () => getDefaultUser()));
  }, [query]);

  return (
    <Hidden only="xs">
      <WhiteTooltip
        arrow
        interactive
        open={!!result.length}
        title={
          result.length && (
            <Grid className={cx.resultContainer} container>
              {result.map((item) => (
                <Grid
                  key={item.id}
                  item
                  className={cx.resultLink}
                  onClick={() => {
                    setQuery('');
                    history.push(Path.ACCOUNT(item.username));
                  }}
                >
                  <div className={cx.resultWrapper}>
                    <div className={cx.avatarWrapper}>
                      <Avatar src={item.profile_image} alt="User avatar" />
                    </div>
                    <div className={cx.nameWrapper}>
                      <Typography variant="body1">{item.username}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.name}
                      </Typography>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          )
        }
      >
        <InputBase
          className={cx.input}
          placeholder="Search"
          startAdornment={<span className={cx.searchIcon} />}
          endAdornment={
            loading ? (
              <LoadingIcon />
            ) : (
              <span onClick={() => setQuery('')} className={cx.clearIcon} />
            )
          }
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </WhiteTooltip>
    </Hidden>
  );
};

export default Search;