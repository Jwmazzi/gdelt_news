import { Router, Request, Response } from "express";
import { query, getNewsQuery } from "../public/db";
import { get_params } from "../public/utils";

const router = Router();

router.get("/", async (req: Request, resp: Response) => {

    let parameters = get_params(req.url);

    let newsQuery = getNewsQuery(parameters.version);

    let stories = await query(newsQuery, [parameters.cameo_code]);

    resp.send({
        // date: utils.get_time((runtime.rows.length < 1) ? 0 : runtime.rows[0].runtime),
        title:  `${parameters.cameo_name} Headlines`.toUpperCase(),
        stories: stories.rows,
        // cam_type: cameo_name[0].toUpperCase() + cameo_name.slice(1)
    })

});

export default router;