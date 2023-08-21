const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Item name is required"],
        minLength: [3, "Item name should have at least 3 characters"]
    },
    state: {
        type: String,
        enum: ["Not Started", "In Progress", "Completed"], // Start Project // Move to Completed // Completed. 
        default: "Not Started"
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"]
    }
}, {
    timestamps: true
});

const ItemModel = mongoose.model("Items", ItemSchema);

module.exports = ItemModel;
