const express = require('express')
const router  = express.Router()
const utils   = require('../public/javascripts/utils');
const db      = require('../public/javascripts/db')


router.get('/', async (rt_req, rt_res) => {
    
    // Unpack Incoming Arguments
    var [cameo_name, cameo_code, version, keyword] = utils.get_params(rt_req.url)

    // Get Relevant Queries
    let newsQuery = utils.getNewsQuery(cameo_code, version, keyword)
    let timeQuery = utils.getTimeQuery(version)

    // Collect V1/V2 Stories
    // TODO - Handle Error Response Within utils.js?
    let stories = await db.query(newsQuery, []).catch(e => {console.log(e); return})
    let runtime = await db.query(timeQuery, []).catch(e => {console.log(e); return})

    // Return Data to Client
    rt_res.send({
        date: utils.get_time((runtime.rows.length < 1) ? 0 : runtime.rows[0].runtime),
        title:  `${cameo_name} Headlines`.toUpperCase(),
        stories: stories.rows,
        cam_type: cameo_name[0].toUpperCase() + cameo_name.slice(1)
    })

})

module.exports = router;