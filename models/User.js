const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
<<<<<<< HEAD:models/User.js
  name: { type: String, required: true }, // ✅ Add this line with "required: true"
=======
  name: { type: String, required: true }, // ✅ added required validation
>>>>>>> 0e2a559 (Include backend changes before pull):models/user.js
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
