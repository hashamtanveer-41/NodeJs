const {Router} = require("express")
const multer = require("multer")
const Blog = require("../models/blog")
const path = require("path")
const router = Router();

const storage = multer.diskStorage({
    destination: function (req, res, cb){
        return cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
})
const upload = multer({storage})
router.get("/add-new", (req, res)=>{
    return res.render("addBlog", {
        user: req.user,
    })
})

router.get("/:id",  async (req,res)=>{
    const blog = await  Blog.findById(req.params.id)
    return res.render("blog", {
        user: req.user,
        blog
    })
})

router.post("/", upload.single("coverImage"),async (req, res)=>{
    const {title, body} = req.body;
    const blog = await Blog.create({
        body,
        title,
        createdBy: req.user._id,
        coverImageUrl: `/uploads/${req.file.filename}`
    })
    return res.redirect(`/blog/${blog._id}`);
})

module.exports = router;
