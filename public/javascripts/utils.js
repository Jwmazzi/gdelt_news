const cameo   = require('./cameo')
const url     = require('url')
const db      = require('./db')

module.exports = {

    get_params(req_url) {

        var url_params = url.parse(req_url, true).query

        var version = (url_params.v === undefined) ? 'v1' : url_params.v
        var keyword = url_params.keyword
        var c_name  = (url_params.category === undefined) ? 'comment' : url_params.category
        var c_code  = cameo[c_name]
    
        return [c_name, c_code, version, keyword]
    
    },

    get_time(seconds) {
        var t = new Date(1970, 0, 1)
        t.setSeconds(seconds)
        return t
    },

    getNewsQuery(cameo_code, version, keyword) {

        let base_where = `where left(eventcode, 2) = '${cameo_code}'`
        let full_where = (keyword === undefined) ? base_where : `${base_where} and keywords like '%${keyword.toLowerCase()}%'`

        return [db.sql.story_base, `from ${version}`, full_where, db.sql.story_order].join(' ')

    },

    getTimeQuery(version) {

        return `select runtime from ${version}_lastrun order by runtime desc limit 1`

    }

}