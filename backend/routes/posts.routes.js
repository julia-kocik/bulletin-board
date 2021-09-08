const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .select('author created title photo text price status updated')
      .sort({created: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts', upload.single('photo'), async (req, res) => {
  try {
    const {
      title,
      created,
      author,
      price,
      text,
    } = req.body;

    const photo = req.file;
    console.log(photo);
    const fileName = photo.filename + '.' + photo.originalname.split('.').pop();
    console.log(fileName);
    const newPost = new Post({
      title: title,
      status: 'published',
      created: created,
      author: author,
      price: price,
      text: text,
      photo: fileName,
    });
    await newPost.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
