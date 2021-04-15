// default config
import { think } from "thinkjs";
export = {
  workers: 1,
  port: 8002,
  errnoField: 'code',
  errmsgField: 'msg',
  defaultErrno: 0,
  validateDefaultErrno: -1,
  domain: think.env == 'development' ? 'http://192.168.31.180:8001' : 'http://cxapi.tecqm.club',
  currentPage: 1, // 默认页码
  pageSize: 10, // 默认条数
  tencentCos: { // 腾讯cos对象储存账号
    // SecretId: 'AKIDoOilY6VL2g4wYxI3kCahxJSM0NinJAJB',
    // SecretKey: 'wgAcpmSEkzyh5C2fEXZKo9D1b9VaPyTz',
    SecretId: 'AKIDd14nHWQ0E7frhCMAdkWuxf23j43h0xYn',
    SecretKey: 'wXmfDQHmwkDL7XcLjlRljMdZ9NGnzpKT',
    // bucket: 'cos-cx-n1-1257124629',
    // region: 'ap-guangzhou'
    bucket: 'bkfpin-1255000368',
    region: 'region-wh'
  },
  wx: { // 微信公众号的appid和密钥
    appid: 'wx5421da096af52832',
    appSecret: 'e37b2afb56be4fd64e4578c18ac61871',
    mch_id: 1591304471,
    pay_secret: 'emb23434FFFFSSSAyuncixiuapiTECQM'
  },
  express: { // 快递鸟
    appid: '1647388', // 对应快递鸟用户后台 用户ID EBusinessID
    appkey: '32729fb8-d85d-4619-b83d-fce7e6baf634', // AppKey
    request_url: 'http://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx' // 快递鸟实时物流接口
  },
  wilcom: { // 澳洲接口账号密钥
    appId: 'ba4d7ce4',
    appKey: 'e9fbfcc2397822784eb02f18676585db'
  },
  taobao: { // 淘宝API配置
    appkey: 'tbwitvkxF',
    appsecret: 'QudBRueHoMIWNyZ8',
    api_url: 'https://taoapi.ndxiu.com/service/get_detail_union.php'
  },
  stickyCluster: true,
};
