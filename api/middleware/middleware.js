const Posts = require('../posts/posts-model');

const Users = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  )
  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const id = req.params.id;
  const result = await Users.findById(id);
  if(result === null) {
    res.status(404).json({message: 'user not found'});
  } else {
    req.user = result;
  }
  next();
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.user) {
    res.status(400).json({message: 'missing required name field'})
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if(!req.body.post) {
    res.status(400).json({ message: 'missing required text field'})
  }
}

// do not forget to expose these functions to other modules

module.exports = { logger, validateUserId, validateUser, validatePost}