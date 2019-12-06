const Reminder = require('../models/reminder.model');
const { check, validationResult } = require('express-validator');


module.exports.createReminder = function (reminderObject) {
  return new Promise(function (resolve) {
    let reminderInstance = new User(reminderObject);
    reminderInstance.save((err) => {
      if (err) throw err;
      resolve();
    });
  });
}