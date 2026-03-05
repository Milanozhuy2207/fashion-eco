const Category = require('../models/Categories')

const getCategory = async(req,res) => {
    try{
        const {name, slug, parent} = req.body

        const categoryExists = await Category.findOne({slug})

        if(categoryExists){
            return res.status(400).json({message: "Category already exists"})
        }

        const category = new Category({
            name, 
            slug: slug || name.toLowerCase().split(' ').join('-'),
            parent: parent || null

        })

        const createdCategory = await category.save()
        res.status(201).json(createdCategory)

    }catch(error){
        res.status(400).json({message: error.message})
    }
}

const deleteCategory = async(req,res) => {
    try{
        const category = await Category.findById(req.params.id)
        if(category)
        {
            await category.deleteOne()
            res.json({message: "Category deleted"})
        }else{
            res.status(404).json({message: "Category not found"})
        }
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = { getCategories, createCategory, deleteCategory };