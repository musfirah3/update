require('dotenv').config()
const { connect} = require('mongoose');
const mongoose =require('mongoose')
const Category = require('./model')


// Add Category
const addCategory = async (req, res) => {
    const { categoryName, categoryImage } = req.body;
    if (!categoryName || !categoryImage) {
        res.status(404).json({
            message: "All the fields required "
        })
    }
    else {
        try {
            await connect(process.env.MONGO_URL)
            const category = await Category.exists({ categoryName: categoryName })
            if (category) {
                return res.status(500).json({

                    message: "Category already exsist"
                })
            }
             await Category.create({ categoryName, categoryImage })
            const categories =await Category.find()
            res.status(201).json({
                message: "Category Added",
                categories
            })
        }

        catch (error) {
            res.json({
                message: error.message
            })
        }
    }
}

// get all items
const getAllCategory = async (req, res) => {
    try {
        await connect(process.env.MONGO_URL)
        const category = await Category.find()
        res.json({ category })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

}

// get category by name
const CategoryByName = async (req, res) => {
    const name = req.params.name;


    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("db is ok")
        const categoriesName = await Category.findOne({ categoryName: name })
        console.log("Category found:", categoriesName);
        if (!categoriesName) {

            return res.status(404).json({
                message: "Category not found"
            })
        } else {
            res.json({
                data: categoriesName
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving category information",
            error: error.message
        })

    }
}

// Delete 
const deleteCategory = async (req, res) => {
    const _id = req.params;

    try {
        // Find the category and delete it
        const deletedCategory = await Category.findByIdAndRemove(_id);
        console.log("deleted Category should be :", deletedCategory)

        if (!deletedCategory) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.json({
            message: "Category deleted successfully",
            user: deletedCategory
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting Category",
            error: error.message
        });
    }
};

// Update Category
const updateCategory = async (req, res) => {
    const _id = req.params;
    const { categoryName,categoryImage } = req.body

    try {
        console.log("Updating category with ID:", _id);
        // Find the user and update it
        const updatedCategory = await Category.findOneAndUpdate({ _id }, {
            $set: {
                categoryName: categoryName,
                categoryImage:categoryImage

            }
        },
            { new: true } // This option returns the updated document instead of the original one
        );

        if (!updatedCategory) {
            return res.status(404).json({
                message: "Category not found"
            });
        }


        res.json({
            message: "Category updated successfully",
            user: updatedCategory
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating Category",
            error: error.message
        });
    }
}

// Get Category information through user id
const getCategoryById = async (req, res) => {
    const { _id } = req.params
    if (!_id) {
        res.status(403).json({ message: "Please Give Category id" })
    }
    else {
        await connect(process.env.MONGO_URL)
        const category = await Category.findOne({ _id })
        res.json({ category })
    }
}


module.exports = { addCategory, getAllCategory, CategoryByName, deleteCategory, updateCategory, getCategoryById }

