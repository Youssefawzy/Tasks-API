const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    uniqe: true,
    required: [true, "Please enter the category name"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

categorySchema.virtual("tasks", {
  ref: "Task",
  foreignField: "tour",
  localField: "_id",
});
module.exports = mongoose.model("Category", categorySchema);
