const Category = require("./../models/categoryModel");
const Task = require("./../models/taskModel");
const APIFeatures = require("./../utils/apiFeatures");

exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = req.user;
    console.log({ name, user });
    const category = await Category.create({ name, user });

    res.status(200).json({
      status: "success",
      Category: category,
    });
  } catch (error) {
    res.json({
      error: error.message,
      error: error.stack,
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const features = new APIFeatures(Category.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const categories = await features.query;

    res.status(200).json({
      status: "success",
      results: categories.length,
      Categories: {
        categories,
      },
    });
  } catch (error) {
    res.json({
      error: error.message,
      error: error.stack,
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("user");

    if (!category) {
      const error = new Error("No category found with that ID");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      status: "success",
      Category: {
        category,
      },
    });
  } catch (error) {
    res.json({
      error: error.message,
      error: error.stack,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    const { name } = category;

    if (!category) {
      const error = new Error("No category found with that ID");
      error.status = 404;
      throw error;
    }

    const tasks = await Task.deleteMany({ category: name });

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.json({
      error: error.message,
      error: error.stack,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!category) {
      const error = new Error("No category found with that ID");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      status: "success",
      data: {
        category,
      },
    });
  } catch (error) {
    res.json({
      error: error.message,
      error: error.stack,
    });
  }
};
