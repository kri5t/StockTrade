
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index', { title: 'StockTrade' });
};

exports.partials = function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
};

exports.partialsFolder = function(req, res){
    name = req.params.name
    pasta = req.params.folder
    res.render('partials/' + folder + '/' + name)
};

exports.partialIndex = function(req, res){
    res.render('index')
};