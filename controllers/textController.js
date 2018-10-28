var Text = require('../models/text');

exports.get_new_text = function(req, res, next) {
    let text = `
    Kur lygūs laukai,
    Snaudžia tamsūs miškai,
    Lietuviai barzdočiai dūmoja;
    Galanda kirvius,
    Kalavijus aštrius
    Ir juodbėrį žirgą balnoja.
    `
    var words = text.split(' ').filter(function (el) {
        return el;
    });
  
    const theme = words[ Math.floor(Math.random() * words.length) ].replace(/[\.||\,||\-||\;]/gi, '');
  
    res.render('index', { theme });
}

exports.new_text = async function(req, res, next) {
    const { duration, text, author, theme } = req.body;

    let textObj = {
        duration,
        text,
        theme,
        likes: 0,
        comments: [],
    }

    if (author)
        textObj.author = author;

    let t = new Text(textObj)

    try {
        await t.save();
    } catch(err) {
        return console.error('Error saving text to the DB: ', err);
    }

    console.log("The text that has been submitted: \n");
    console.log(text);
    
    res.end();
};

exports.all_texts = async function(req, res, next) {
    const { theme } = req.params;

    let texts = [];
    try {
        texts = await Text.find({ theme });
    } catch(err) {
        return console.error('Error getting all texts from DB: ', err);
    }

    res.render('finished', { texts, theme })
}