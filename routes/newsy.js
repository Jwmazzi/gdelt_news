const express = require('express')
const router  = express.Router()
const utils   = require('../public/javascripts/utils');
const db      = require('../public/javascripts/db')


router.get('/', (rt_req, rt_res) => {
    
    // Unpack Cameo Data from Incoming Request URL
    var [cameo_name, cameo_code, version] = utils.get_params(rt_req.url)

    // Get Correct Query - Potentailly Move to util.js
    var [data, time]  = (version == 'v1') ? [db.sql.v1_base, db.sql.v1_lastrun] : [db.sql.v2_base, db.sql.v2_lastrun]

    // Return Rows to Client
    db.query(data, [cameo_code], (base_err, base_res) => {

        db.query(time, [], (time_err, time_res) => {

            rt_res.send({
                date: utils.get_time(time_res.rows[0].runtime),
                title:  `${cameo_name} Headlines`.toUpperCase(),
                stories: base_res.rows,
                cam_type: cameo_name[0].toUpperCase() + cameo_name.slice(1)
            })

        })
    
    })

})

module.exports = router;