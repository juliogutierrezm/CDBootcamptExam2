// routes/item.routes.js
const ItemController = require('../controllers/item.controller');

module.exports = function(app) {
    app.get('/api/items', ItemController.getAllItems);
    app.get('/api/items/:id', ItemController.getOneItem);
    app.post('/api/items', ItemController.createItem);
    app.patch('/api/items/:id', ItemController.updateItem);
    app.delete('/api/items/:id', ItemController.deleteItem);
};
