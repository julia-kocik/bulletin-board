import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, isLogged, fetchPublished } from '../../../redux/postsRedux';
import { useEffect } from 'react';
import {Link} from 'react-router-dom';

import styles from './Post.module.scss';

const Component = ({className, loadedData, fetchPublishedPosts, linkId, posts}) => {
  useEffect(() => {
    fetchPublishedPosts();
  }, [fetchPublishedPosts]);
  return (
    <div className={clsx(className, styles.root)}>
      {posts.filter(element => element._id === linkId).map(one => (
        <div className={styles.postBox} key={one._id}>
          <p className={styles.title}>{one.title.toUpperCase()}</p>
          <img className={styles.image} src={one.photo} alt="Post one"></img>
          <p className={styles.price}>${one.price}</p>
          <p className={styles.content}>Description: {one.text}</p>
          <p className={styles.content}>Status: {one.status}</p>
          <p className={styles.date}>Created: {one.created}</p>
          <p className={styles.date}>Updated: {one.updated}</p>
        </div>
      ))}
    
      {loadedData.posts.logged 
        ?
        posts.filter(element => element._id === linkId).map(one => (
          <div className={styles.logged} key={one._id}>
            <Link className={styles.button} to={`/post/${one._id}/edit`}>Edit Post</Link>
          </div>
        ))
        :
        ''
      }
    </div>
  );
};


Component.propTypes = {
  linkId: PropTypes.string,
  className: PropTypes.string,
  loadedData: PropTypes.object,
  fetchPublishedPosts: PropTypes.func,
  posts: PropTypes.array,
};

const mapStateToProps = (state, props) => ({
  posts: getAll(state),
  loadedData: isLogged(state),
  linkId: props.match.params.id,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Post,
  Component as PostComponent,
};
