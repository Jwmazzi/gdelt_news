import url from "url";
import { cameo } from "../public/cameo";


export function getParams(req_url: string) {

    let url_params = url.parse(req_url, true).query;

    let name = url_params.category ?? 'comment';
    let version =  url_params.v ?? 'v1';

    return {
        cameo_name: name.toString(),
        cameo_code: cameo[name.toString()],
        version: version.toString(),
        keyword: url_params.keyword
    }
}

export function getTime(seconds: number): Date {

    var d = new Date(1970, 0, 1);
    d.setSeconds(seconds);

    return d;
}
