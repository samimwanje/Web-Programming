'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Create a schema.
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: [8, 'The password must be of the minimum of the characters.'] }
}, { timestamp: true, versionKey: false }

)

userSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })

  // If the password is incorrect.
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid login attempt.')
  }

  return user
}

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 8)
})

// Create a model (table) using the schema.
const userModel = mongoose.model('UserSchema', userSchema)

// Export the module
module.exports = userModel
