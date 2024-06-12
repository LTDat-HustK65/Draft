const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/GraduatedProject');

const draftSchema = new mongoose.Schema({
    timeApear: Date,
    properties: {
        name: String,
        currentLocation:{
            x: Number,
            y: Number,
            z:Number
        }
    }
});
module.exports = mongoose.model('draft', draftSchema);

