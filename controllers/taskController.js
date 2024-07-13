const Task = require("./../models/taskModel");
const Category = require("./../models/categoryModel");

exports.createtask = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      const error = new Error("Category Not Found");
      error.statuss = 404;
      throw error;
    }

    const { title, is_shared, type, listTask, textTask } = req.body;

    if (type === "text" && listTask && listTask.items.length > 0) {
      const error = new Error(
        "For 'text' tasks, 'listTask.items' should not be provided."
      );
      error.statuss = 400;
      throw error;
    }

    if (type === "list" && (!listTask || !listTask.items.length)) {
      const error = new Error(
        "For 'list' tasks, 'listTask.items' must be provided."
      );
      error.statuss = 400;
      throw error;
    }
    const user = req.user._id;

    const task = await Task.create({
      title,
      category,
      is_shared,
      type,
      listTask,
      textTask,
      user,
    });

    res.status(200).json({
      status: "success",
      Task: task,
    });
  } catch (error) {
    res.json({
      error: error.message,
      error: error.stack,
    });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({
      status: "success",
      results: tasks.length,
      Tasks: {
        tasks,
      },
    });
  } catch (error) {
    res.json({
      error: error.message,
      error: error.stack,
    });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      const error = new Error("No task found with that ID");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      status: "success",
      Task: {
        task,
      },
    });
  } catch (error) {
    res.json({
      error: error.message,
      error: error.stack,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      const error = new Error("No task found with that ID");
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

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!task) {
      const error = new Error("No task found with that ID");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      status: "success",
      Task: {
        task,
      },
    });
  } catch (error) {
    res.json({
      error: error.message,
      error: error.stack,
    });
  }
};
