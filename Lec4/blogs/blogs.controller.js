const { Router } = require("express");
const BlogService = require('./blogs.service');
const hasBlogDeletePermitionMiddleware = require("../middlewares/has-blog-delete-permition.middleware");
const rejectHalfReqeustsMiddleware = require("../middlewares/reject-half-reqeusts.middleware");

const blogRouter = new Router()

blogRouter.get('/', BlogService.getAllBlogs)
blogRouter.post('/', BlogService.createBlog)
blogRouter.get('/:id', BlogService.getBlogById)
blogRouter.delete('/:id', hasBlogDeletePermitionMiddleware, BlogService.deleteBlogById)
blogRouter.put('/:id', BlogService.updateBlogById)

module.exports = blogRouter