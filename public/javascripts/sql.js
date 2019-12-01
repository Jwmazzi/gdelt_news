module.exports = {

    base: `
    select
    globaleventid,
    left(title, 75) as title,
    keywords,
    sourceurl as source, 
    site,
    actor1name as name_one,
    actor2name as name_two,
    round(avgtone::numeric, 2) as avgtone,
    goldsteinscale as goldstein
    from gdelt_latest_dst
    where left(eventcode, 2) = $1
    order by goldstein desc
    limit 20
    `
    ,

    geom: `
    SELECT jsonb_build_object(
        'type',     'FeatureCollection',
        'features', jsonb_agg(feature)
    )
    FROM (
    SELECT jsonb_build_object(
        'type',       'Feature',
        'id',         globaleventid,
        'geometry',   ST_AsGeoJSON(geom)::jsonb,
        'properties', to_jsonb(row) - 'geom'
    ) AS feature
    FROM (
        SELECT * 
        FROM gdelt_latest_dst
        where left(eventcode, 2) = $1
        limit 20
    ) row) features;
   `
   ,

   skills: `
   select title
   from gdelt_latest_dst
   where left(eventcode, 2) = $1
   limit 5
   `
   
}