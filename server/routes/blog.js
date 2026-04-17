const router = require('express').Router();
const { listPosts, getPostBySlug, createPost } = require('../controllers/blogController');
const adminAuth = require('../middleware/adminAuth');

router.get('/', listPosts);
router.get('/:slug', getPostBySlug);
router.post('/', adminAuth, createPost);

module.exports = router;
