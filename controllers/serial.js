var serial = require('../models/serial');
// List of all serials

exports.serial_list = async function (req, res) {
    try {
        theSerials = await serial.find();
        res.send(theSerials);
    } catch (err) {
        res.error(500, `{"error": ${err}}`);
    }
};


// Handle serial create on POST.
exports.serial_create_post = async function (req, res) {
    console.log(req.body)
    let document = new serial();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"serialtype":"goat", "cost":12, "size":"large"}
    document.name = req.body.name;
    document.author = req.body.author;
    document.season = req.body.season;
    try {
        let result = await document.save();
        res.send(result);
    } catch (err) {
        res.error(500, `{"error": ${err}}`);
    }
};
// for a specific serial.
exports.serial_detail = async function (req, res) {
    console.log("I am here");
    console.log("detail" + req.params.id)
    try {
        result = await serial.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};
// Handle serial delete form on DELETE.
exports.serial_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: serial delete DELETE ' + req.params.id);
};
// Handle serial update form on PUT.
exports.serial_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await serial.findById(req.params.id)
        // Do updates of properties
        if (req.body.name) {
            toUpdate.name = req.body.name;
        } else {

        }
        if (req.body.author) {
            toUpdate.author = req.body.author;
        } else {

        }
        if (req.body.season) {
            toUpdate.season = req.body.season;
        } else {

        }
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }

};
// VIEWS
// Handle a show all view
exports.serial_view_all_Page = async function (req, res) {
    try {
        theserials = await serial.find();
        res.render('serials', {
            title: 'serial Search Results',
            results: theserials
        });
    } catch (err) {
        res.error(500, `{"error": ${err}}`);
    }
};

// Handle a show one view with id specified by query
exports.serial_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id)
    try {
        result = await serial.findById(req.query.id)
        res.render('serialdetail', {
            title: 'serial Detail',
            toShow: result
        });
    } catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
// Handle building the view for creating a serial.
// No body, no in path parameter, no query.
// Does not need to be async
exports.serial_create_Page =  function(req, res) {
    console.log("create view")
    try{
        res.render('serialcreate', { title: 'Serial Create'});
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
