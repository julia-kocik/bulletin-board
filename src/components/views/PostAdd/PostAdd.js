import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { isLogged, addOnePost } from '../../../redux/postsRedux';

import styles from './PostAdd.module.scss';

const Component = ({className, loadedData, addNewPost}) => {
  const [post, setPost] = useState(
    {
      id: '',
      title: '',
      price: '',
      text: '',
      created: '',
      image: '',
      author: '',
    }
  );
  const handleChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };
  const submitForm = (event) => {
    event.preventDefault();
    console.log(post.title, post.price, post.text, post.photo, post.author);
    if(post.title && post.price && post.text && post.photo && post.author){
      post.id = uuidv4();
      post.created = new Date().toLocaleDateString();
      addNewPost(post);
      alert('Post was added!');

      setPost({
        id: '',
        title: '',
        price: '',
        text: '',
        created: '',
        author: '',
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
          <h2 className={styles.title}>Post Add</h2>
          <form className={styles.adForm} action="/contact/send-message" method="POST" encType="multipart/form-data" onSubmit={submitForm}>
            <label>Title</label>
            <input className={styles.formInput} type="text" name="title" onChange={handleChange}></input>
            <label>Price </label>
            <input className={styles.formInput} type="number" name="price" onChange={handleChange}></input>
            <label>Email </label>
            <input className={styles.formInput} type="email" name="author" onChange={handleChange}></input>
            <label>Description </label>
            <textarea className={styles.formInput} cols="50" type="text" name="text" onChange={handleChange}></textarea>
            <label>Image</label>
            <input className={styles.imageInput} type="file" name="photo" accept=".png, .jpg, .jpeg, .gif" onChange={handleChange}></input>
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
  addNewPost: PropTypes.func,
};

const mapStateToProps = state => ({
  loadedData: isLogged(state),
});

const mapDispatchToProps = dispatch => ({
  addNewPost: (newPost) => dispatch(addOnePost(newPost)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Container as PostAdd,
  Component as PostAddComponent,
};
