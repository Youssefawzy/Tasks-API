const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const textTaskSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const listItemSchema = new Schema(
  {
    item_body: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const listTaskSchema = new Schema(
  {
    items: [listItemSchema],
  },
  { _id: false }
);

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["text", "list"],
    required: true,
  },
  is_shared: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  textTask: textTaskSchema,
  listTask: listTaskSchema,
});

module.exports = mongoose.model("Task", taskSchema);
