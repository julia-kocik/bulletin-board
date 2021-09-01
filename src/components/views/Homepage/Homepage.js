import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { isLogged } from '../../../redux/postsRedux';
import { getAll } from '../../../redux/postsRedux';
import { fetchPublished } from '../../../redux/postsRedux';
import {Link} from 'react-router-dom';


import styles from './Homepage.module.scss';

const Component = ({className, loadedData, fetchPublishedPosts, posts}) => {
  useEffect(() => {
    fetchPublishedPosts();
  }, [fetchPublishedPosts]);
  
  if(loadedData.posts.loading.active) return (<div>Loading...</div>);
  else {
    return (
      <div className={clsx(className, styles.root)}>
        <div className={styles.postWrapper}>
          {loadedData.posts.logged 
            ?
            posts.map(item => 
              (
                <Link className={styles.postBox} to={`/post/${item._id}`} key={item._id}>
                  <p className={styles.title}>{item.title.toUpperCase()}</p>
                  <img className={styles.image} src={item.photo} alt="Post item"></img>        
                  <p className={styles.price}>${item.price}</p>
                  <p className={styles.content}>Description: {item.text}</p>
                  <p className={styles.content}>Status: {item.status}</p>
                  <p className={styles.date}>Created: {item.created}</p>
                  <p className={styles.date}>Updated: {item.updated}</p>
                </Link>
              ))
      
            :
            ''
          }
        </div>
      </div>
    );
  }
};

Component.propTypes = {
  className: PropTypes.string,
  loadedData: PropTypes.object,
  posts: PropTypes.array,
  fetchPublishedPosts: PropTypes.func,
};

const mapStateToProps = state => ({
  loadedData: isLogged(state),
  posts: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as Homepage,
  Component as HomepageComponent,
};
