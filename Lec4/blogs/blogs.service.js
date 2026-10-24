const { readFile, writeFile } = require('../utils')

exports.getAllBlogs = async (req, res) => {
    let blogs = await readFile('blogs.json', true)
    if(req.query.likeFrom){
        blogs = blogs.filter(blog => blog.likeCount >= Number(req.query.likeFrom))
    }

    if(req.query.likeTo){
        blogs = blogs.filter(blog => blog.likeCount <= Number(req.query.likeTo))
    }

    if(req.query.category){
        let categories = req.query.category.split(',')
        blogs = blogs.filter(blog => categories.includes(blog.category))
    }

    const page = Math.max(Number(req.query.page) || 1, 1)
    const take = Math.min(Math.max(Number(req.query.take) || 30, 1), 100)
    const start = (page - 1) * take

    res.json({
        page,
        take,
        total: blogs.length,
        totalPages: Math.ceil(blogs.length / take),
        data: blogs.slice(start, start + take)
    })
}

exports.createBlog = async (req, res) => {
    if(!req.body?.title || !req.body?.desc){
        return res.status(400).json({
            error: true,
            message: "title and desc is required"
        })
    }
    const blogs = await readFile('blogs.json', true)
    const lastId = blogs[blogs.length-1]?.id || 0
    const newBlog = {
        id: lastId+1,
        title: req.body.title,
        desc: req.body.desc
    }
    blogs.push(newBlog)
    await writeFile('blogs.json', blogs)
    res.status(201).json(newBlog)
}

exports.getBlogById = async (req, res) => {
    const id = Number(req.params.id)
    const blogs = await readFile('blogs.json', true)
    const blog = blogs.find((blog) => blog.id === id)
    if(!blog){
        return res.status(404).json({
            error: true,
            message: "blog not found"
        })
    }
    res.json(blog)
}

exports.deleteBlogById = async (req, res) => {
    const id = Number(req.params.id)
    const blogs = await readFile('blogs.json', true)
    const index = blogs.findIndex((user) => user.id === id)
    if(index === -1){
        return res.status(400).json({
            error: true,
            message: "user not exists"
        })
    }

    const deletedBlog = blogs.splice(index, 1)
    await writeFile('blogs.json',blogs)
    res.json(deletedBlog[0])
}

exports.updateBlogById = async (req, res) => {
    const id = Number(req.params.id)
    const blogs = await readFile('blogs.json', true)
    const index = blogs.findIndex((user) => user.id === id)
    if(index === -1){
        return res.status(400).json({
            error: true,
            message: "user not exists"
        })
    }
    blogs[index] = {
        ...blogs[index],
        ...req.body
    }
   await writeFile('blogs.json', blogs)
    res.json(blogs[index])
}