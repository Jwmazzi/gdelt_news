const express = require('express')
const router  = express.Router()
const utils   = require('../public/javascripts/utils')
const db      = require('../public/javascripts/db')
var _         = require('lodash')


router.get('/', (rt_req, rt_res) => {
    
    // Unpack Cameo Data from Incoming Request URL
    var [cameo_name, cameo_code, version] = utils.get_params(rt_req.url)

    // Get Correct Query
    var key_query = (version == 'v1') ? db.sql.v1_keys  : db.sql.v2_keys

    db.query(key_query, [], (base_err, base_res) => {

        // Flatten All Keywords & Remove Leading/Trailing Whitespace
        var key_array = base_res.rows.map(e => e.keywords).flat().map(e => e.trim())

        // Get Count & Sort Descending
        var key_count = _.countBy(key_array)
        var key_sort  = Object.entries(key_count).sort((a, b) => b[1] - a[1]).slice(0, 20)

        rt_res.send({keywords: key_sort})
    
    })

})

module.exports = router;