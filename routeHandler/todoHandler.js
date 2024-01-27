const express = require("express");
const ToDo = require("../models/toDoCreateModel");
const User = require("../models/userCreateModel");
const router = express.Router();
const isAuthenticate = require('../middleware/Authentication.middleware')


// GET ALL THE TODO'S
router.get('/', isAuthenticate, async (req, res) => {
  try {
 
    const { category, status, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status.toLowerCase(); 

    const hasFilters = Object.keys(filter).length > 0;

    const query = hasFilters ? ToDo.find(filter).populate('user') : ToDo.find().populate('user');

    const todos = await query.skip((page - 1) * limit).limit(parseInt(limit)).exec();
    const totalCount = hasFilters ? await ToDo.countDocuments(filter) : await ToDo.countDocuments();

    return res.status(200).json({
      code: 200,
      status: 'success',
      msg: hasFilters ? 'Filtered TODOs retrieved successfully' : 'All TODOs retrieved successfully',
      data: todos,
      pageInfo: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(todos.length / parseInt(limit)),
        totalCount
      },
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: 'failed',
      msg: error.message,
    });
  }
});



// GET A TODO by ID

router.get('/:id',isAuthenticate, async (req, res) => {
  try {
    const todo = await ToDo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        code: 404,
        status: 'failed',
        msg: 'ToDo not found',
      });
    }

    return res.status(200).json({
      code: 200,
      status: 'success',
      msg: 'ToDo retrieved successfully',
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: 'failed',
      msg: error.message,
    });
  }
});


router.post('/', isAuthenticate, async (req, res) => {
  try {
    // Create ToDo
    const todo = await ToDo.create({
      ...req.body,
      user: req.userId
    });

    // Update user with the created ToDo
    await User.updateOne(
      { _id: req.userId },
      { $push: { toDos: todo._id } }
    );

    return res.status(201).json({
      code: 201,
      status: 'success',
      msg: 'ToDo created successfully',
      response: todo,
    });
  } catch (error) {
    return res.status(400).json({
      code: 400,
      status: 'failed',
      msg: error.message,
    });
  }
});


// POST MULTIPLE TODO'S
router.post("/multiple",isAuthenticate, async (req, res) => {
  try {
    const response = await ToDo.insertMany(req.body)
    return res.status(201).json({
      code: 201,
      status: 'success',
      msg: 'Multiple ToDo created successfully',
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

// PUT OR UPDATE A TODO
router.put("/:id",isAuthenticate, async (req, res) => {
  try {
    const { status, ...otherFields } = req.body;
    if (status) {
    
      if (status.toLowerCase() === 'pending' || status.toLowerCase() === 'active' || status.toLowerCase() === 'done') {
        const response = await ToDo.findByIdAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              status: status.toLowerCase(), 
              ...otherFields, 
            },
          },
          {
            new: true,
          }
        );

        return res.status(200).json({
          code: 200,
          status: "success",
          msg: "ToDo updated successfully",
          response,
        });
      } else {
  
        return res.status(400).json({
          code: 400,
          status: "failed",
          msg: "Invalid value for 'status'. It must be 'pending', 'active' or  'done'.",
        });
      }
    } else {

      return res.status(400).json({
        code: 400,
        status: "failed",
        msg: "Status is required in the request body for updating ToDo",
      });
    }
  } catch (error) {
    return res.status(400).json({
      code: 400,
      status: "failed",
      msg: error.message,
    });
  }
});




// DELETE TODO by ID
router.delete('/:id',isAuthenticate, async (req, res) => {
  try {
    const deletedToDo = await ToDo.findByIdAndDelete(req.params.id);

    if (!deletedToDo) {
      return res.status(404).json({
        code: 404,
        status: 'failed',
        msg: 'ToDo not found',
      });
    }

    return res.status(200).json({
      code: 200,
      status: 'success',
      msg: 'ToDo deleted successfully',
      data: deletedToDo,
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
