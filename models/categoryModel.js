const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter the category name"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

categorySchema.index({ name: 1, user: 1 }, { unique: true });

module.exports = mongoose.model("Category", categorySchema);
