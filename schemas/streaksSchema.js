const mongoose = require('mongoose');
const { Schema, model } = require("mongoose")
const streaksSchema = new Schema({
  name: { type: String },
  unitInterval: { type: String },
  amount: { type: String },
  userId: { type: String },
  partialHits: { type: Number },
  goalHits: { type: Number },
  fails: { type: Number },
  failsPosition: { type: Number },
  success: { type: Number }
},
  { timestamps: true }
);

const Streaks = model("Streaks", streaksSchema);
module.exports = Streaks