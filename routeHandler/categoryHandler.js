const express = require("express");
const Category = require("../models/categoryCreateModel");
const router = express.Router();


// GET ALL CATEGORY
router.get('/', async (req, res) => {
    try {
        const response = await Category.find();
        return res.status(200).json({
            code: 200,
            status: 'success',
            msg: 'Successfully get category list',
            data: response,

        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            status: 'failed',
            msg: error.message,
        });
    }
});


// POST A CATEGORY
router.post('/', async (req, res) => {
    try {
        const response = await Category.create(req.body);
        return res.status(201).json({
            code: 201,
            status: 'success',
            msg: 'Category created successfully',
            response,
        });
    } catch (error) {
        return res.status(400).json({
            code: 400,
            status: 'failed',
            msg: error.message,
        });
    }
});


//  UPDATE A CATEGORY
router.put("/:id", async (req, res) => {
    try {

        const response = await Category.findByIdAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body,
        }, {
            new: true
        });

        return res.status(200).json({
            code: 200,
            status: "success",
            msg: "Category updated successfully",
            response,
        });
    } catch (error) {

        return res.status(400).json({
            code: 400,
            status: "failed",
            msg: error.message,
        });
    }
});





// DELETE CATEGORY BY ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);

        if (!deletedCategory) {
            return res.status(404).json({
                code: 404,
                status: 'failed',
                msg: 'Category not found',
            });
        }

        return res.status(200).json({
            code: 200,
            status: 'success',
            msg: 'Category deleted successfully',
            data: deletedCategory,
        });
    } catch (error) {
        return res.status(500).json({
            code: 500,
            status: 'failed',
            msg: error.message,
        });
    }
});

module.exports = router;