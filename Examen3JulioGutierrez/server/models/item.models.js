const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title must contain 2 characters"],
        minlength: [3, "Note title should have at least 3 characters"]
    },
    body: {
        type: String,
        required: [true, "Body must contain max of 255 characters"],
        maxlength: [255, "Note body should not exceed 255 characters"]
    }
}, {
    timestamps: true
});


const ItemModel = mongoose.model("Items", ItemSchema);

module.exports = ItemModel;
