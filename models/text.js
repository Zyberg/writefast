var mongoose = require('mongoose');

var TextSchema = new mongoose.Schema(
    {
        timeStart: { type: Date, default: Date.now },
        duration: { type: Number, required: true },
        text: { type: String, required: true },
        author: { type: String, default: 'Nežinomas Autorius' },
        theme: { type: String, required: true },
        likes: Number,
        comments: [ String ],
    }
);

var Text = mongoose.model('Text', TextSchema );

module.exports = Text;