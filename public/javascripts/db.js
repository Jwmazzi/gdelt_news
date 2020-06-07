require('dotenv').config()

const { Pool } = require('pg')
const pool = new Pool()

module.exports = {

    query: (text, params, callback) => {
        
        return pool.query(text, params, callback)
    },

    sql: {
        story_base: `
        select globaleventid, left(title, 75) as title, keywords, sourceurl as source, site, summary, 
        actor1name as name_one, actor2name as name_two, round(avgtone::numeric, 2) as avgtone,
        goldsteinscale as goldstein, st_asgeojson(geom) as geom
        `
        , 

        story_clause: `
        where left(eventcode, 2) = $1
        `
        ,

        story_order: `
        order by goldstein asc
        limit 20
        `
        ,

        v1_base: `
        select globaleventid, left(title, 75) as title, keywords, sourceurl as source, site, summary, 
        actor1name as name_one, actor2name as name_two, round(avgtone::numeric, 2) as avgtone,
        goldsteinscale as goldstein, st_asgeojson(geom) as geom
        from v1
        where left(eventcode, 2) = $1
        order by goldstein asc
        limit 20
        `
        , 

        v2_base: `
        select globaleventid, left(title, 75) as title, keywords, sourceurl as source, site, summary, 
        actor1name as name_one, actor2name as name_two, round(avgtone::numeric, 2) as avgtone,
        goldsteinscale as goldstein, st_asgeojson(geom) as geom
        from v2
        where left(eventcode, 2) = $1
        order by goldstein asc
        limit 20
        `
        , 
     
        v1_lastrun: `
        select runtime
        from v1_lastrun
        order by runtime desc
        limit 1
        `
        ,

        v2_lastrun: `
        select runtime
        from v2_lastrun
        order by runtime desc
        limit 1
        `
        , 

        v1_keys: `
        select regexp_split_to_array(keywords, ';') as keywords from v1
        where keywords is not null
        `
        ,

        v2_keys: `
        select regexp_split_to_array(keywords, ';') as keywords from v2
        where keywords is not null   
        `
        ,

        skills: `
        select title
        from gdelt_latest_dst
        where left(eventcode, 2) = $1
        limit 5
        `
    }
}