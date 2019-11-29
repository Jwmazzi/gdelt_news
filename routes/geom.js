const express = require('express')
const router  = express.Router()
const utils   = require('../public/javascripts/utils');
const sql     = require('../public/javascripts/sql')
const db      = require('../public/javascripts/db')

router.get('/', (rt_req, rt_res) => {

    // Unpack Cameo Data from Incoming Request URL
    var [cameo_name, cameo_code] = utils.get_cameo(rt_req.url)

    db.query(sql.geom, [cameo_code], (err, res) => {

        rt_res.send(res.rows[0].jsonb_build_object)

    })

})

module.exports = router;