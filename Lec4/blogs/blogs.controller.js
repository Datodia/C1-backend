const { Router } = require("express");
const BlogService = require('./blogs.service')

const blogRouter = new Router()


blogRouter.get('/', BlogService.getAllBlogs)
blogRouter.post('/', BlogService.createBlog)
blogRouter.get('/:id', BlogService.getBlogById)
blogRouter.delete('/:id', BlogService.deleteBlogById)
blogRouter.put('/:id', BlogService.updateBlogById)

module.exports = blogRouter