import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { isLogged } from '../../../redux/postsRedux';
import {Link} from 'react-router-dom';


import styles from './Homepage.module.scss';

const Component = ({className, loadedData}) => (
  <div className={clsx(className, styles.root)}>
    <div className={styles.postWrapper}>
      {loadedData.posts.logged 
        ?
        loadedData.posts.data.map(item => 
          (
            <Link className={styles.postBox} to={`/post/${item.id}`} key={item.id}>
              <p className={styles.title}>{item.title.toUpperCase()}</p>
              <img className={styles.image} src={item.image} alt="Post item"></img>        
              <p className={styles.price}>${item.price}</p>
              <p className={styles.content}>{item.content}</p>
              <p className={styles.date}>{item.publicationDate}</p>
            </Link>
          ))
      
        :
        ''
      }
    </div>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  loadedData: PropTypes.object,
};

const mapStateToProps = state => ({
  loadedData: isLogged(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  Container as Homepage,
  Component as HomepageComponent,
};
