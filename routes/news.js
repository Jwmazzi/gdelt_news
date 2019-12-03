const express = require('express')
const router  = express.Router()
const utils   = require('../public/javascripts/utils');
const sql     = require('../public/javascripts/sql')
const db      = require('../public/javascripts/db')

router.get('/', (rt_req, rt_res) => {

    // Unpack Cameo Data from Incoming Request URL
    var [cameo_name, cameo_code] = utils.get_cameo(rt_req.url)

    // Return Rows to Handlebars Template
    db.query(sql.base, [cameo_code], (base_err, base_res) => {

        db.query(sql.lastrun, [], (time_err, time_res) => {

            rt_res.render('news', {
                date: utils.get_time(time_res.rows[0].runtime),
                title:  `${cameo_name} Headlines`.toUpperCase(),
                stories: base_res.rows,
                cam_type: cameo_name[0].toUpperCase() + cameo_name.slice(1)
            })

        })
    
    })

})

module.exports = router;