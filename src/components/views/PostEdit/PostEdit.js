import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { isLogged, getOne, editPost } from '../../../redux/postsRedux';

import styles from './PostEdit.module.scss';

const Component = ({className, loadedData, onePost, editPost}) => {
  const [post, setPost] = useState(...onePost);
  const handleChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };
  const submitForm = (event) => {
    event.preventDefault();
    if(post.title || post.price || post.content || post.image){
      post.publicationDate = new Date().toISOString();
      editPost(post);
      alert('Post was changed!');

      setPost({
        id: '',
        title: '',
        price: '',
        content: '',
        publicationDate: '',
        image: '',
      });
    } else {
      alert('Please fill required fields');
    }
  };
  return (
    <div className={clsx(className, styles.root)}>
      {loadedData.posts.logged 
        ?
        <div>
          <h2 className={styles.title}>Post Edit</h2>
          <form className={styles.adForm} action="/contact/send-message" method="POST" encType="multipart/form-data" onSubmit={submitForm}>
            <label>Title</label>
            <input className={styles.formInput} type="text" name="title" onChange={handleChange}></input>
            <label>Price </label>
            <input className={styles.formInput} type="number" name="price" onChange={handleChange}></input>
            <label>Description </label>
            <textarea className={styles.formInput} cols="50" type="text" name="content"  onChange={handleChange}></textarea>
            <label>Image</label>
            <input className={styles.imageInput} type="file" name="image" accept=".png, .jpg, .jpeg, .gif" onChange={handleChange}></input>
            <button className={styles.button} type="submit">Send message</button>
          </form>
        </div>
        :
        ''
      }
    </div>
  );
};

Component.propTypes = {
  loadedData: PropTypes.object,
  className: PropTypes.string,
  onePost: PropTypes.array,
  editPost: PropTypes.func,
};

const mapStateToProps = (state, props) => ({
  loadedData: isLogged(state),
  onePost: getOne(state, props.match.params.id),
});

const mapDispatchToProps = dispatch => ({
  editPost: post => dispatch(editPost(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as PostEdit,
  Component as PostEditComponent,
};
