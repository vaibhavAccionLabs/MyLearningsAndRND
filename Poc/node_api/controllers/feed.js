exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: '3534',
        title: 'First Post',
        content: 'Post Description',
        imageUrl: 'images/vaibhav.jpg',
        creator: { name: 'vaibhav katariya' },
        createdAt: new Date()
      }
    ]
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  res.status(201).json({
    message: 'Post Created Successfully',
    post: {
      id: new Date().toISOString(),
      title,
      content
    }
  });
};
