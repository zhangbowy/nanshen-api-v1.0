import * as request from "request";
import * as log4js from "log4js";

const logger = log4js.getLogger("DingdingBot");
const ApplicationTypeHeader:string = "application/json;charset=utf-8";

// DingdingBot
// https://open-doc.dingtalk.com/microapp/serverapi2/qf2nxq
export default class DingdingBot {
    private readonly _webhookUrl:string;
    constructor(webhookUrl:string){
        this._webhookUrl = webhookUrl;
    }

    public pushMsg (msg: string, atMobiles?: Array<string>): boolean{
        try {

            let options: request.CoreOptions = {
                headers: {
                    "Content-Type": ApplicationTypeHeader
                },
                json: {
                        "msgtype": "markdown",
                        "markdown": {
                        "title":"消息推送",
                            "text": msg
                    },
                        "at": {
                        "atMobiles": [
                        ],
                            "isAtAll": false
                    }
                    // "msgtype": "text",
                    // "text": {
                    //     "content": msg
                    // },
                    // "at": {
                    //     "atMobiles": atMobiles == null ? [] : atMobiles,
                    //     "isAtAll": false
                    // }
                }
            };
            request.post(this._webhookUrl, options, function(error, response, body){
                logger.debug(`push msg ${msg}, response: ${JSON.stringify(body)}`);
            });
        }
        catch(err) {
            console.error(err);
            return false;
        }
    }
}
