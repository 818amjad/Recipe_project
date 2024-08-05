const Recipes = require("../models/recipe")
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + '-' + file.fieldname
        cb(null, fileName)
    }
})

const upload = multer({ storage: storage })
const getRecipes = async (req, res) => {
    const recipes = await Recipes.find()
    res.json(recipes)
}

const getRecipe = async (req, res) => {
    const recipe = await Recipes.findById(req.params.id)
    res.json(recipe)
}

const addRecipe = async (req, res) => {
    console.log(req.user)
    const { title, ingredients, instructions, time } = req.body

    if (!title || !ingredients || !instructions) {
        res.json({ message: "Required fields can't be empty" })
    }

    const newRecipe = await Recipes.create({
        title, 
        ingredients, 
        instructions, 
        time,
        coverImage:req.file?.filename,
        createdBy:req.user.id
    })
    res.json(newRecipe)
}

const editRecipe = async (req, res) => {
    const { title, ingredients, instructions, time } = req.body
    let recipe = Recipes.findById(req.params.id)
    try {
        if (recipe) {
            await Recipes.findByIdAndUpdate(req.params.id, {...req.body,coverImage:req.file.filename}, { new: true })
            res.json({ title, ingredients, instructions, time })
        }
    }
    catch (err) {
        res.status(404).json({ message: "error" })
    }

}

const deleteRecipe = async (req, res) => {
    try {
        await Recipes.deleteOne({ _id: req.params.id })
        res.json({ status: "ok" })
    }
    catch (err) {
        res.status(400).json({ message: "error" })
    }
}

module.exports = { getRecipes, addRecipe, getRecipe, editRecipe, deleteRecipe ,upload}