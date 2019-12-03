const cameo   = require('./cameo')
const url     = require('url')

module.exports = {

    get_cameo(req_url) {

        var url_params = url.parse(req_url, true).query

        var c_name = (url_params.category === undefined) ? 'protest' : url_params.category
        var c_code = cameo[c_name]
    
        return [c_name, c_code]
    
    },

    get_time(seconds) {
        var t = new Date(1970, 0, 1); // Epoch
        t.setSeconds(seconds);
        return t;
    }

}