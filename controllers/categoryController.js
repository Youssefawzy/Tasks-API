const Category = require("./../models/categoryModel");

exports.createCategory = async (req, res, next) => {
  const { name } = req.body;
  const user = req.user;
  console.log({ name, user });
  const category = await Category.create({ name, user });

  res.status(200).json({
    status: "success",
    Category: category,
  });
};

exports.getAllCategories = async (req, res) => {
  const categories = await Category.find().populate("user");

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: categories.length,
    Categories: {
      Categories,
    },
  });
};

exports.getCategory = async (req, res) => {
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
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      const error = new Error("No category found with that ID");
      error.status = 404;
      throw error;
    }

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
