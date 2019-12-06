var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var reminderSchema = Schema({
  date: Date,
  title: String,
  description: String,
  user: { type: Schema.Types.ObjectId, ref: 'users' }
});

const Reminder = mongoose.model('reminders', userSchema);
module.exports = Reminder;