const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const ItemModel = require("../models/item.models");

module.exports = {
    getAllItems: (req, res) => {
        ItemModel.find({}, { _id: true, name: true, state: true, dueDate: true })
            .then((items) => {
                res.json({ data: items });
            })
            .catch((error) => {
                res.status(500).json({ error: error });
            });
    },
    getOneItem: (req, res) => {
        let id = req.params.id;
        if (!ObjectId.isValid(id))
            return res.status(400).json({ message: "id doesn't match the expected format" });
        ItemModel.find({ _id: id })
            .then((item) => {
                res.json({ data: item });
            })
            .catch((error) => {
                res.status(500).json({ error: error });
            });
    },
    createItem: (req, res) => {
        let data = req.body;
        ItemModel.create(data)
            .then((item) => {
                res.json({ data: item });
            })
            .catch((error) => {
                if (error instanceof mongoose.Error.ValidationError) {
                    let keys = Object.keys(error.errors);
                    let error_dict = {};
                    keys.map((key) => {
                        error_dict[key] = error.errors[key].message;
                    });
                    res.status(500).json({ error: error_dict });
                } else {
                    res.status(500).json({ error: error });
                }
            });
    },
    deleteItem: (req, res) => {
        let id = req.params.id;
        if (!ObjectId.isValid(id))
            return res.status(400).json({ message: "id doesn't match the expected format" });
        ItemModel.deleteOne({ _id: id })
            .then(() => {
                res.json({ success: true });
            })
            .catch((error) => {
                res.status(500).json({ error: error });
            });
    },
    updateItem: (req, res) => {
        let id = req.params.id;
        let data = req.body;
        const updateOptions = {
            new: true, // Return the updated document
            runValidators: true, // Enforce validation during update
        };
        if (!ObjectId.isValid(id))
            return res.status(400).json({ message: "id doesn't match the expected format" });
        ItemModel.findByIdAndUpdate({ _id: id }, data, updateOptions)
            .then(() => {
                res.json({ success: true });
            })
            .catch((error) => {
                if (error instanceof mongoose.Error.ValidationError) {
                    let keys = Object.keys(error.errors);
                    let error_dict = {};
                    keys.map((key) => {
                        error_dict[key] = error.errors[key].message;
                    });
                    res.status(500).json({ error: error_dict });
                } else {
                    res.status(500).json({ error: error });
                }
            });
    },
};
