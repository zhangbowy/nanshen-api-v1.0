import { think } from 'thinkjs';
const path = require('path');
const COS = require('cos-nodejs-sdk-v5');
const fs = require('fs');
const rp = require('request-promise');
import func from './../utils/func';
const appId = think.config('wilcom').appId;
const appKey =  think.config('wilcom').appKey;
module.exports = class extends think.Service {
    constructor() {
        super();
    }

    /**
     * 根据图片获取刺绣预览图
     * @$image 图片base64字符串
     * @return 刺绣图片<base64>
     */
     async getEmbByImg($image: string, $width: any, $height: any, reurn_emb?: boolean) {

        const width = $width || 100;
        const height = $height || 100;
        const base64Image = $image;
        const options = {
            method: 'POST',
            uri: 'http://161.117.60.187/api/bitmapartdesign',
            // uri: 'http://ewa.wilcom.com/2.0/api/bitmapartdesign',
            // uri: 'http://ewa.wilcom.com/2.0/api/vectorArtDesign',
            body: {
                appId,
                appKey,
                requestXml: `<xml>
                  <bitmap
                    file="pic.png"
                    remove_background="true"
                  />
<!--                    <vector-->
<!--                     file="pic.pdf"-->
<!--                     dpi="300"-->
<!--                     remove_background="true"-->
<!--                    />-->
                  <autodigitize_options
                     width = "${width}"
                     height= "${height}"
                  />
                  <output
                     trueview_file="final_design_trueview.png"
                     design_file="final_design.emb"
                     dpi ="270"
                  />
                  <!--                     design_version="Wilcom All-in-One Designs e2 (*.EMB)"-->
                  <files>
                   <file
                     filename="pic.png"
                     filecontents="${base64Image}"
                   />
                  </files>
                </xml>`
            },
            json: true
        };

        const result = await rp(options);

        const embData = func.getFilecontentsEMB(result);
        const pngData = func.getFilecontentsPNG(result);
        if (!embData) {
            throw new Error('获取design错误');
        }
        if (reurn_emb) {
            return embData;
        } else {
            return pngData;
        }
        // req.embDataBuffer = embData;//存储生成的 emb data
        // req.pngData = pngData; //存储生成的 png data
        // console.log('图片--》design api返回成功')
        // console.log('embData==>',embData);
    }

    /**
     * 获取emb文件设计信息 针数、换色顺序等
     */
    async getDesignInfo($embData: string) {
        const options3 = {
            method: 'POST',
            // uri: 'http://ewa.wilcom.com/2.0/api/designInfo',
            uri: 'http://161.117.60.187/api/designInfo',
            body: {
                appId,
                appKey,
                requestXml: `<xml>
                    <files>
                    <file filename="design.EMB" filecontents="${$embData}" />
                    </files>
                    </xml>`
            },
            json: true
        };
        // emb info
        const resForInfo = await rp(options3);
        return  resForInfo;
    }

    /**
     * 获取Dst
     * @param $emb
     * return DST BUFFER
     */
    async getDst($emb?: string) {
        try {
            const options1 = {
                method: 'POST',
                uri: 'http://ewa.wilcom.com/2.0/api/newdesign',
                body: {
                    appId,
                    appKey,
                    requestXml: `<xml>
              <autodigitize_options
                     width = "30"
                     height= "30"
              />
              <recipe>
              <decorations>
              <design file="DesignName.EMB"/>
              </decorations>
              <output design_file="DesignName.dst"
              trueview_file="DesignName.png" />
              </recipe>
              <files>
              <file filename="DesignName.EMB" filecontents="${$emb}"/>
              </files>
              </xml>`
                },
                json: true
            };

            const result = rp(options1);
            const dstData = func.getFilecontentsDST(result);
            // var embData = util.getFilecontentsEMB(parsedBody)
            // const pngData = func.getFilecontentsPNG(result);
            return  Buffer.from(dstData, 'base64');
        } catch (err) {
        }
    }

    /**
     * 去底色
     * @param $pngData png图片base64
     * @return
     */
    async getBitmapPreview($pngData: string) {
        const options3 = {
            method: 'POST',
            // uri: 'http://ewa.wilcom.com/2.0/api/designInfo',
            uri: 'http://161.117.60.187/api/bitmapArtPreview',
            body: {
                appId,
                appKey,
                requestXml: `<xml>
                <bitmap
                    file="trueview.png"
                    remove_background="true"/>
                    <files>
                    <file filename="trueview.png" filecontents="${$pngData}" />
                    </files>
                    </xml>`
            },
            json: true
        };
        // emb info
        const resForInfo = await rp(options3);
        const pngData: any = func.getFilecontentsPNG(resForInfo);
        Buffer.from(pngData, 'base64');
        return Buffer.from(pngData, 'base64');
    }
};
