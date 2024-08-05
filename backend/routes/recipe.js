const express=require("express")
const { getRecipes,addRecipe,getRecipe,editRecipe,deleteRecipe,upload } = require("../controller/recipe")
const verifyToken = require("../middleware/auth")
const router=express.Router()

router.get("/",getRecipes) //Get all recipes
router.get("/:id",getRecipe) //Get recipe by id
router.post("/",upload.single('file'),verifyToken,addRecipe) //Add recipe
router.put("/:id",upload.single('file'),editRecipe) //Edit recipe
router.delete("/:id",deleteRecipe) //Delete recipe


module.exports=router