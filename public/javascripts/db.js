require('dotenv').config()

const { Pool } = require('pg')
const pool = new Pool()

module.exports = {

    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    },

    sql: {
        base: `
        select globaleventid, left(title, 75) as title, keywords, sourceurl as source, site, summary, 
        actor1name as name_one, actor2name as name_two, round(avgtone::numeric, 2) as avgtone,
        goldsteinscale as goldstein, st_asgeojson(geom) as geom
        from gdelt_latest_dst
        where left(eventcode, 2) = $1
        order by goldstein desc
        limit 20
        `
        , 
    
        skills: `
        select title
        from gdelt_latest_dst
        where left(eventcode, 2) = $1
        limit 5
        `
        ,
     
        lastrun: `
        select runtime
        from gdelt_latest_run
        order by runtime desc
        limit 1
        `
    }
}