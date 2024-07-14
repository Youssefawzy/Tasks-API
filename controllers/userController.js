const Task = require("./../models/taskModel");
const APIFeatures = require("./../utils/apiFeatures");
exports.getMyTasks = async (req, res) => {
  try {
    const user = req.user;

    const features = new APIFeatures(
      Task.find({ user: req.user }).populate("user").populate("category"),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tasks = await features.query;

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
