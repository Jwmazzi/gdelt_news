import { Pool } from "pg";

const pool = new Pool();


export function query(text: string, params: Array<string> = []) {

    return pool.query(text, params);
    
}

export function getNewsQuery(version: string) {

    let query = version === "v1" ? Queries.BaseV1 : Queries.BaseV2;

    return query;

}

export enum Queries {
    BaseV1 = `
                select globaleventid, left(title, 75) as title, keywords, sourceurl as source, site, summary, 
                actor1name as name_one, actor2name as name_two, round(avgtone::numeric, 2) as avgtone,
                goldsteinscale as goldstein, st_asgeojson(geom) as geom
                from v1_exports
                limit 100
                `,
    BaseV2 = `
                select globaleventid, left(title, 75) as title, keywords, sourceurl as source, site, summary, 
                actor1name as name_one, actor2name as name_two, round(avgtone::numeric, 2) as avgtone,
                goldsteinscale as goldstein, st_asgeojson(geom) as geom
                from v2_exports
                where eventrootcode = $1
                limit 100
             `
}