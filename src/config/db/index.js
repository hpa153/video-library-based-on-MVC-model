const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/my_videos');
    console.log("Successfully connected!");
  } catch (error) {
    console.log("Connection failed!");
  }
}

module.exports = { connect };