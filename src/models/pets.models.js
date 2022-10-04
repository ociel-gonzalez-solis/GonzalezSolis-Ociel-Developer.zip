const mongoose = require("mongoose");

const petsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "the pet name must be provided"],
  },
  tag: {
    type: String,
    required: [true, "tag of the pet must be provided"],
  },
});

module.exports = mongoose.model("pets", petsSchema);
