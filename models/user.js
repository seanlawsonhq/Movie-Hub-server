const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please Provide a valid email",
    ], // This is called Regex. The first box. bracket is [user]@[gmail].[com]
  },

  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);

// Regex (in other words called regular expressions) they are used to define patterns such as (user@gmail.com, user@mail@gmail.com or user@gmail.co.uk)

// Schema.. structure of how the Api looks like.

// Bcrypt.....
