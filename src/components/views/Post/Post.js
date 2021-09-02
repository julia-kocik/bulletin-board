import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getOne, isLogged } from '../../../redux/postsRedux';
import { fetchOnePost } from '../../../redux/postsRedux';
import { useEffect } from 'react';
import {Link} from 'react-router-dom';

import styles from './Post.module.scss';

const Component = ({className, one, loadedData, fetchOnePost}) => {
  console.log(one);
  useEffect(() => {
    fetchOnePost();
  }, [fetchOnePost]);
  return (
    <div className={clsx(className, styles.root)} key={one.id}>
      <div className={styles.postBox}>
        <p className={styles.title}>{one.title.toUpperCase()}</p>
        <img className={styles.image} src={one.photo} alt="Post one"></img>
        <p className={styles.price}>${one.price}</p>
        <p className={styles.content}>Description: {one.text}</p>
        <p className={styles.content}>Status: {one.status}</p>
        <p className={styles.date}>Created: {one.created}</p>
        <p className={styles.date}>Updated: {one.updated}</p>
      </div>
      
      {loadedData.posts.logged 
        ?
        <div className={styles.logged}>
          <Link key={one.id} className={styles.button} to={`/post/${one.id}/edit`}>Edit Post</Link>
        </div>
        :
        ''
      }
    </div>
  );
};


Component.propTypes = {
  one: PropTypes.object,
  className: PropTypes.string,
  loadedData: PropTypes.object,
  fetchOnePost: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  one: getOne(state, props.match.params.id),
  loadedData: isLogged(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchOnePost: () => dispatch(fetchOnePost(props.match.params.id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Post,
  Component as PostComponent,
};
