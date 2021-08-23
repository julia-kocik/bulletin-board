import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import styles from './Header.module.scss';
import { connect } from 'react-redux';
import { isLogged, logIn, logOut } from '../../../redux/postsRedux';
import {Link} from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';



const Component = ({className, state, logIn, logOut}) => {
  console.log(state.posts.logged);
  return (
    <div className={clsx(className, styles.root)}>
      <div className={styles.logged}>
        <p onClick={logIn} className ={styles.logButton}>Login</p>
        <p onClick={logOut} className ={styles.logButton}>Loggout</p>
      </div>
      <AppBar position="static" className={clsx(className, styles.appBar)}>
        <Toolbar className={clsx(className, styles.root)}>
          <Link className ={styles.button} to={'/'}>
            <HomeIcon className={clsx(className, styles.home)}/>
          </Link>
          <h6 className={clsx(className, styles.title)}>Bulletin Board</h6>
          {state.posts.logged ? (
            <div className={styles.logged}>
              <Link className={styles.button} to={'/post/add'}>Add Post</Link>
            </div>
          ) : (
            <div className={styles.logged}>
              <a className={styles.button} href='https://google.com'>Login</a>
            </div>)}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  state: PropTypes.object,
  logIn: PropTypes.func,
  logOut: PropTypes.func,
};

const mapStateToProps = state => ({
  state: isLogged(state),
});

const mapDispatchToProps = dispatch => ({
  logIn: logged => dispatch(logIn(logged)),
  logOut: logged => dispatch(logOut(logged)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Header,
  Component as HeaderComponent,
};
