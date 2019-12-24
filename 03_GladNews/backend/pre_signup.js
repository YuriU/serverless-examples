'use strict'

module.exports.handler = (event, context, cb) => {
  console.log(event)
  // Always confirm the user so they can log in immediately
  // They can confirm their email later when they make their first post

  // Removed. For safety reasons
  event.response.autoConfirmUser = false;
  return cb(null, event)
}
