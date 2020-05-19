const express = require('express')
const router  = express.Router()
const utils   = require('../public/javascripts/utils');
const db      = require('../public/javascripts/db')

router.get('/', (rt_req, rt_res) => {

    // Unpack Cameo Data from Incoming Request URL
    var [cameo_name, cameo_code] = utils.get_cameo(rt_req.url)

    // Return Rows to Client
    db.query(db.sql.base, [cameo_code], (base_err, base_res) => {

        db.query(db.sql.lastrun, [], (time_err, time_res) => {

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