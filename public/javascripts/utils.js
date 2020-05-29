const cameo   = require('./cameo')
const url     = require('url')

module.exports = {

    get_params(req_url) {

        var url_params = url.parse(req_url, true).query

        var version = (url_params.v === undefined) ? 'v1' : url_params.v
        var c_name  = (url_params.category === undefined) ? 'comment' : url_params.category
        var c_code  = cameo[c_name]
    
        return [c_name, c_code, version]
    
    },

    get_time(seconds) {
        var t = new Date(1970, 0, 1)
        t.setSeconds(seconds)
        return t
    }

}