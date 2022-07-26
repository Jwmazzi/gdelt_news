import { Router, Request, Response } from "express";
import { query, getKeywordsQuery } from "../public/db";
import { get_params } from "../public/utils";
import _ from "lodash";

const router = Router();

router.get("/", async (req: Request, resp: Response) => {

    let parameters = get_params(req.url);

    let keysQuery = getKeywordsQuery(parameters.version);
    let keywords = await query(keysQuery, [parameters.cameo_code]);

    let keys = keywords.rows.map(e => e.keywords).flat().map(e => e.trim());
    let key_count = _.countBy(keys);
    let top_keys = Object.entries(key_count).sort((a, b) => b[1] - a[1]).slice(0, 10);

    resp.send({
        keywords: top_keys
    })

});

export default router;