/**
 * Loads controller
 * @param {string} controller_name 
 */
function load_controller(controller_name)
{
    return require('../controllers/'+controller_name+'.js');
}

/**
 * Loads model
 * @param {string} model_name 
 */
function load_model(model_name)
{
    return require('../models/'+model_name+'.js');
}

/**
 * Loads library
 * @param {string} library_name 
 */
function load_library(library_name)
{
    return require('../libraries/'+library_name+'.js');
}

/**
 * Output API data to clients
 * @param {object} data 
 * @param {string} message 
 * @param {Number} status 
 */
function output_data(res, data, message, status)
{
    let output_data = {'status': status,'message': message, 'data': data};
    res.json(output_data);
}

module.exports = {
    load_controller,
    load_model,
    load_library,
    output_data
};
