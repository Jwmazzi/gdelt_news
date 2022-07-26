import { Router, Request, Response } from "express";
import { query, newsQuery, timeQuery } from "../public/db";
import { getParams, getTime } from "../public/utils";

const router = Router();

router.get("/", async (req: Request, resp: Response) => {

    let parameters = getParams(req.url);

    let stories = await query(newsQuery(parameters.version), [parameters.cameo_code]);
    let runtime = await query(timeQuery(parameters.version), []);

    resp.send({
        date: getTime((runtime.rows.length < 1) ? 0 : runtime.rows[0].runtime),
        title:  `${parameters.cameo_name} Headlines`.toUpperCase(),
        stories: stories.rows,
        cam_type: parameters.cameo_name[0].toUpperCase() + parameters.cameo_name.slice(1)
    })

});

export default router;