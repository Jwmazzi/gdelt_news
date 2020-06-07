const express = require('express')
const router  = express.Router()
const utils   = require('../public/javascripts/utils')
const db      = require('../public/javascripts/db')
var _         = require('lodash')


router.get('/', async (rt_req, rt_res) => {
    
    // Unpack Cameo Data from Incoming Request URL
    var [cameo_name, cameo_code, version] = utils.get_params(rt_req.url)

    // Get Correct Query
    var key_query = (version == 'v1') ? db.sql.v1_keys  : db.sql.v2_keys

    
    // Fetch, Flatten All Keywords Results, and Remove Leading/Trailing Whitespace
    let keywords = await db.query(key_query, [])
    let the_keys = keywords.rows.map(e => e.keywords).flat().map(e => e.trim())

    // Get Count & Sort Descending
    var key_count = _.countBy(the_keys)
    var key_sort  = Object.entries(key_count).sort((a, b) => b[1] - a[1]).slice(0, 20)

    // Return Data to Client
    rt_res.send({keywords: key_sort})

})

module.exports = router;