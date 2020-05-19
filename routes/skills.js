const express = require('express')
const router  = express.Router()
const utils   = require('../public/javascripts/utils')
const db      = require('../public/javascripts/db')

router.get('/', (rt_req, rt_res) => {

    // Unpack Cameo Data from Incoming Request URL
    var [cameo_name, cameo_code] = utils.get_cameo(rt_req.url)

    // Return Rows to Alexa Skill
    db.query(db.sql.skills, [cameo_code], (err, res) => {

        rt_res.send(res.rows.map(r => r.title).join('<break time=".5s"/> Next Headline <break time=".5s"/>'))
    
    })

})

module.exports = router;