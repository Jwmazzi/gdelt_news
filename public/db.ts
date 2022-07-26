import { Pool } from "pg";

const pool = new Pool();


export function query(text: string, params: Array<string> = []) {

    return pool.query(text, params);
    
}

export function getNewsQuery(version: string) {

    return `
            select globaleventid, left(title, 75) as title, keywords, sourceurl as source, site, summary, 
            actor1name as name_one, actor2name as name_two, round(avgtone::numeric, 2) as avgtone,
            goldsteinscale as goldstein, st_asgeojson(geom) as geom
            from ${version}_exports
            where eventrootcode = $1
            limit 100
            `
}

export function getKeywordsQuery(version: string): string {

    let base  = "select regexp_split_to_array(keywords, ';') as keywords"
    let table = `from ${version}_exports where keywords is not null and eventrootcode = $1`

    return [base, table].join(" ");
}