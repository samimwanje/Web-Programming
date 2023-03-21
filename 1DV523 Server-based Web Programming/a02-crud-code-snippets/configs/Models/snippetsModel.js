'use strict'
const mongoose = require('mongoose')

// Create a schema.
const userSnippet = new mongoose.Schema({
  username: { type: String, required: true, unique: false },
  created: { type: String, required: true, unique: false },
  name: { type: String, required: true, unique: false, maxLength: [20, 'Name can maximum be 20 caracters.'] },
  description: { type: String, required: true, minLength: [5, 'Please type at least five characters in the textbox.'], maxLength: [10000, 'Please type less than 200 characters in the textbox.'] }
}, { timestamp: true, versionKey: false })

// Create a model (table) using the schema.
const snippetModel = mongoose.model('userSnippet', userSnippet)

// Export the module
module.exports = snippetModel
