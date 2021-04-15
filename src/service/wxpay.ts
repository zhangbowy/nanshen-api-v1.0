import { think } from 'thinkjs';
const WXPay = require('weixin-pay');
module.exports = class extends think.Service {
    /**
     * 查询订单
     * @param $order
     * @param $prepay_id
     */
    async findOrder($order_no: string) {
        const wxpay = WXPay({
            appid: 'wx5421da096af52832',
            mch_id: 1591304471,
            partner_key: 'emb23434FFFFSSSAyuncixiuapiTECQM', // 微信商户平台API密钥
            // pfx: fs.readFileSync('./wxpay_cert.p12'), //微信商户平台证书
        });
        return  new Promise((resolve, reject) => {
            // tslint:disable-next-line:only-arrow-functions
            wxpay.queryOrder({ out_trade_no: $order_no }, function(err: any, order: any) {
                // console.log(order);
                let result: any;
                if (order.return_code) {
                    if (order.result_code == 'FAIL') {
                        if (order.return_code) {
                            result = {code: -1, msg: order.err_code_des};
                        } else {
                            result = {code: -1, msg: order.result_msg};
                        }
                    } else {
                        if (order.trade_state && order.trade_state == 'NOTPAY') {
                            // const  reqparam: any = {
                            //     appId: shopConfig.appid,
                            //     timeStamp: Math.floor(Date.now() / 1000) + "",
                            //     nonceStr: order.nonce_str,
                            //     package: "prepay_id=" + $prepay_id,
                            //     signType: "MD5"
                            // };
                            // reqparam.paySign = wxpay.sign(reqparam);
                            result =  {code: -1, msg: '未支付', data: []};
                        } else if (order.trade_state == 'SUCCESS') {
                            // tslint:disable-next-line:no-unused-expression
                            result = {code: 0, msg: "该订单已支付", data: ""};
                        } else if (order.trade_state == 'CLOSED') {
                            result =  {code: -1, msg: "该订单已关闭", data: ""};
                        } else if (order.trade_state == 'REFUND') {
                            result =  {code: -1, msg: "该订单转入退款", data: ""};
                        } else if (order.trade_state == 'PAYERROR') {
                            result =  {code: -1, msg: "支付失败,未知错误", data: ""};
                        }
                    }
                }
                resolve(result);
            });
        });
    }
};
