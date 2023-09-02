require('dotenv').config()
const { connect } = require('mongoose');
const Brand = require('./model')

// add brand
const addBrand = async (req, res) => {
    const { brandName } = req.body;
    console.log("Adding new brand:", brandName);
    const brand = await Brand.findOne({ brandName: brandName })
    if (brand) {
        return res.status(500).json({

            message: "brand already exsist"
        })
    }
    const newBrand = await Brand.create({ brandName })
    console.log("New brand added:", newBrand)
    res.status(201).json({
        message: "brand Added",
        data: newBrand
    })
}
// Get Brand information through user id
const getBrandById = async (req, res) => {
    const { _id } = req.params
    if (!_id) {
        res.status(403).json({ message: "Please Give Brand id" })
    }
    else {
        await connect(process.env.MONGO_URL)
        const brand = await Brand.findOne({ _id })
        res.json({ brand })
    }
}
// get brand by name
const brandByName = async (req, res) => {
    const name = req.params.name;


    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("db is ok")
        const brandsName = await Brand.findOne({ brandName: name })
        console.log("brand found:", brandsName);
        if (!brandsName) {

            return res.status(404).json({
                message: "brand not found"
            })
        } else {
            res.json({
                data: brandsName
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving brand information",
            error: error.message
        })

    }
}

// Delete 
const deleteBrand = async (req, res) => {
    const _id = req.params.id;

    try {
        // Find the category and delete it
        const deletedBrand = await Brand.findByIdAndRemove(_id);
        console.log("deleted category should be :", deletedBrand)

        if (!deletedBrand) {
            return res.status(404).json({
                message: "Brand not found"
            });
        }

        res.json({
            message: "Brand deleted successfully",
            user: deletedBrand
        });
    } catch (error) {
        res.status(500).json({
            message: "Error Brand category",
            error: error.message
        });
    }
};

// Update User
const updateBrand = async (req, res) => {
    const _id = req.params.id;
    const { brandName } = req.body

    try {
        console.log("Updating category with ID:", _id);
        // Find the user and update it
        const updatedBrand = await Brand.findOneAndUpdate({ _id }, {
            $set: {
                brandName: brandName

            }
        },
            { new: true } // This option returns the updated document instead of the original one
        );

        if (!updatedBrand) {
            return res.status(404).json({
                message: "Brand not found"
            });
        }


        res.json({
            message: "Brand updated successfully",
            user: updatedBrand
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating Brand",
            error: error.message
        });
    }
}
// get all items
const getAllBrands = async (req, res) => {
    try {
        await connect(process.env.MONGO_URL)
        const brand = await Brand.find()
        res.json({ brand })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

}

module.exports = { addBrand, brandByName, deleteBrand, updateBrand, getBrandById, getAllBrands }