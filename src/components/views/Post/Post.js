import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getOne, isLogged } from '../../../redux/postsRedux';
import {Link} from 'react-router-dom';

import styles from './Post.module.scss';

const Component = ({className, one, loadedData}) => (
  <div className={clsx(className, styles.root)}>
    {one.map(item => (
      <div className={styles.postBox} key={item.id}>
        <p className={styles.title}>{item.title.toUpperCase()}</p>
        <img className={styles.image} src={item.image} alt="Post item"></img>
        <p className={styles.price}>{item.price}</p>
        <p>{item.content}</p>
        <p className={styles.date}>{item.publicationDate}</p>
      </div>
    ))}
    {loadedData.posts.logged 
      ?
      <div className={styles.logged}>
        <Link className={styles.button} to={'/post/edit'}>Edit Post</Link>
      </div>
      :
      ''
    }
  </div>
);


Component.propTypes = {
  one: PropTypes.array,
  className: PropTypes.string,
  loadedData: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  loadedData: isLogged(state),
  one: getOne(state, props.match.params.id),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  Container as Post,
  Component as PostComponent,
};
