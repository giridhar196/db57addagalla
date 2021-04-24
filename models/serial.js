const mongoose = require("mongoose")
const serialSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name is required"]
    },
    author: String,
    season: {
        type: Number,
        min: [2, "Seson should be min 2"],
        max: [10, "Season should be max of 10"]
    }
})
module.exports = mongoose.model("Serial", serialSchema)