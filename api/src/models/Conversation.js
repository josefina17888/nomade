const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array
    },

  },
  { timestamps: true }
);

const model = mongoose.model("Conversation", ConversationSchema);

module.exports = model;