import url from "url";
import { cameo } from "../public/cameo";


interface NewsyParameters {
    cameo_name: string,
    cameo_code: string,
    version:    string,
    keyword:    string
}


export function get_params(req_url: string) {

    let url_params = url.parse(req_url, true).query;

    let name = url_params.category ?? 'comment';

    return {
        cameo_name: name,
        caemo_code: cameo[name.toString()],
        version: url_params.v ?? 'v1',
        keyword: url_params.keyword
    }
}
