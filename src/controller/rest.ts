import {think} from 'thinkjs';
const rp = require('request-promise');
const fs = require("fs");
const nodeXlsx = require('node-xlsx');
export default class extends think.Controller {

    async __before() {
        if (this.method == "‌OPTIONS") { return false; }
    }

    /**
     * 成功的返回!
     */
    $success($data?: any, $msg?: any) {
        let msg = [];
        if (typeof $msg == 'string') {
            msg[0] = $msg;
        } else {
            msg = $msg;
        }
        this.ctx.body = {
            code: 0,
            data: $data || [],
            msg: msg || []
        };
    }

    /**
     * 失败的返回
     */
    $fail($code?: number, $msg?: any, $data?: any) {
        let msg = [];
        if (typeof $msg == 'string') {
            msg[0] = $msg;
        } else {
            msg = $msg;
        }
        this.ctx.body = {
            code: $code || -1,
            data: $data || [],
            msg: msg || []
        };
        return false;
    }

    /**
     * 抛出错误
     */
    // @ts-ignore
    dealErr($err) {
        const is_development = think.env == 'development';
        let $errMsg;
        const $data: any = {};
        if ($err.sql) {
            $errMsg = $err.sqlMessage || $err.message;
            $data.code = $err.code;
            $data.errno = $err.errno;
            $data.sqlMessage = $err.sqlMessage;
            $data.sqlState = $err.sqlState;
            $data.index = $err.index;
            $data.sql = $err.sql;
            $data.stack = $err.stack;
            $data.message = $err.message;
        } else {
            if ($err.stack && $err.message) {
                $errMsg = $err.message;
                $data.stack = $err.stack;
            }
        }
        if (!is_development) {
            $errMsg = '服务器忙!';
        }
        return this.$fail(-1, $errMsg, $data);
    }

    /**
     * 删除
     * @param path
     */
    deleteFolder(path: any) {
        let files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            const _this = this;
            // tslint:disable-next-line:only-arrow-functions
            files.forEach(function(file: any, index: any) {
                const curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) {
                    _this.deleteFolder(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            // fs.rmdirSync(path);
        }
    }

    /**
     * ip地址获取省市信息
     * @param $ip 有效的ip地址
     */
    async getLocation($ip: any) {
        const ip1 = think.env == 'development' ? '220.184.204.246' : $ip.replace(/::ffff:/g, '');
        const options = {
            method: 'GET',
            url: 'https://restapi.amap.com/v3/ip',
            qs: {
                key: '310d88b1f76599ee6a4b0bd50ba6bbd8',
                ip: ip1,
            }
        };
        const $data = JSON.parse(await rp(options));
        let ipInfo;
        if (typeof $data.province == 'string') {
            ipInfo = `(${$data.province}-${$data.city})`;
        } else {
            ipInfo = $ip;
        }
        return ipInfo;
    }

    /**
     * 浮点运算避免精度丢失 方法
     */
     accMul(arg1: any, arg2: any) {
         // tslint:disable-next-line:prefer-const one-variable-per-declaration
        let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try {m += s1.split(".")[1].length; } catch (e) {}
        try {m += s2.split(".")[1].length; } catch (e) {}
        console.log((Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)).toFixed(2));
        return (Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m));
    }

    /**
     * 递归分类列表
     */
    getTree(data: any, root: any, $id?: any, $pid?: any, $pushTxt?: any) {
        const idTxt: any = $id || 'id';
        const pidTxt: any = $pid || 'pid';
        const pushTxt: any = $pushTxt || 'children';

        // 递归方法
        function getNode(id: any) {
            const node = [];
            const ids = [];
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < data.length; i++) {
                if (data[i][pidTxt] == id) {
                    data[i][pushTxt] = getNode(data[i][idTxt]);
                    node.push(data[i]);
                }
            }
            if (node.length == 0) {
                return;
            } else {
                return node;
            }
        }

        return getNode(root);
    }

    /**
     * 獲取遠程圖片內容
     * @param $this
     * @param $filePath url
     * @param $buffer  output tpye of 1 buffer 0 base64
     */
    async getBuffer($this: any, $filePath: any, $buffer?: boolean) {

        const {Writable} = require('stream');
        // const res = await $this.fetch('http://cos-cx-n1-1257124629.cos.ap-guangzhou.myqcloud.com/gallary/15/2020-04-22/6ca6e51d-028a-43d7-89a2-3537ccfe1adf.png');
        const res = await this.fetch($filePath);
        const chunks: any = [];
        let size = 0;
        return new Promise((resolve, reject) => {
            /**
             * 创建可写流
             */
            const outStream = new Writable({
                write(chunk: Buffer, encoding: string, callback: any) {
                    chunks.push(chunk);
                    // console.log(chunk);
                    size += chunk.length;
                    callback();
                },
                final() {
                    /**
                     * 拼接Buffer
                     */
                    const newBuffer = Buffer.concat(chunks, size);
                    // @ts-ignore
                    const img = 'data:image/png;base64,' + Buffer.from(newBuffer, 'utf8').toString('base64');
                    if ($buffer) {
                        resolve(newBuffer);
                    } else {
                        resolve(img);
                    }
                }
            });
            res.body.pipe(outStream);
        });
    }
    /**
     * 获取完整日期
     */
    getFullTime() {
        const date = new Date();
        const year1 = date.getFullYear();
        const month1 = date.getMonth() + 1;
        const day1 = date.getDate();
        const hour1 = date.getHours();
        const minute1 = date.getMinutes();
        const second1 = date.getSeconds();
        const timers1 = `${year1}年${month1}月${day1}日${hour1}时-${minute1}分-${second1}秒`;
        return timers1;
    }

    /**
     * 用数据生成导出EXCEL
     * @param $data 要导出的数据
     * @param $sheetStyle 要导出的样式
     * @param $outPath 要导出的文件路径
     * @param $fileName 要导出的文件名
     * @success 返回导出excel的url
     * @failed 返回错误信息
     */
    getExcelByData($data: any, $sheetStyle: { '!cols': Array<{ wch: number; }>; }, $header?: any, $fileName?: string) {
        return new Promise((resolve, reject) => {
            // const data = JSON.parse(JSON.stringify($data)); // 复制
            const sheetData: any[] = []; // 表数据
            // const rowData: any[] = []; // 表数据
            // @ts-ignore
            const hcol: any[] = $header; // 表头
            // tslint:disable-next-line:forin
            // for (const col in $data[0]) {
            //     hcol.push(col);
            // }
            for (const item of $data) {
                const rowData: any = [];
                rowData.push(hcol); // 将表头放入表数据第一行
                // @ts-ignore
                item.emb_template_price.forEach((rowV, rowK) => {
                    const rows: any[] = [];
                    hcol.forEach((colV, colK) => {
                        rows[colK] = rowV[colV];  // 外围数据循环一次,这里在循环表头,将data[k]的每一行key对应数据拿出来到需要的格式
                    });
                    rowData.push(rows); // 用表头取到的数据push进表数据
                    // rowData.push(rowV); // 用表头取到的数据push进表数据
                });
                sheetData.push({name: item.template_name, data: rowData});
            }

            const resultExcel2 = nodeXlsx.build(sheetData, $sheetStyle); // node-xlsx模式
            resolve(resultExcel2);
            // fs.writeFile($outPath, resultExcel2, 'binary', function(err: any) {
            //   if (err) {
            //     reject(err);
            //   } else {
            //     const excelcUrl = `http://localhost:8089/public/exportExcel/${$fileName}`;
            //     resolve(excelcUrl);
            //   }
            // });
        });

    }

    /**
     * 用数据生成导出EXCEL
     * @param $data 要导出的数据
     * @param $sheetStyle 要导出的样式
     * @param $outPath 要导出的文件路径
     * @param $fileName 要导出的文件名
     * @success 返回导出excel的url
     * @failed 返回错误信息
     */
    getExcel($data: any, $sheetStyle: { '!cols': Array<{ wch: number; }>; }, $header?: any, $fileName?: string) {
        return new Promise((resolve, reject) => {
            // const data = JSON.parse(JSON.stringify($data)); // 复制
            const sheetData: any[] = []; // 表数据
            // const rowData: any[] = []; // 表数据
            // @ts-ignore
            const hcol: any[] = $header; // 表头
            // tslint:disable-next-line:forin
            // for (const col in $data[0]) {
            //     hcol.push(col);
            // }
            const rowData: any = [];
            rowData.push(hcol); // 将表头放入表数据第一行
                // @ts-ignore
            $data.forEach((rowV, rowK) => {
                    const rows: any[] = [];
                    hcol.forEach((colV, colK) => {
                        rows[colK] = rowV[colV];  // 外围数据循环一次,这里在循环表头,将data[k]的每一行key对应数据拿出来到需要的格式
                    });
                    rowData.push(rows); // 用表头取到的数据push进表数据
                    // rowData.push(rowV); // 用表头取到的数据push进表数据

                });
            sheetData.push({name: 'EMB绣线颜色对照表', data: rowData});
            const resultExcel2 = nodeXlsx.build(sheetData, $sheetStyle); // node-xlsx模式
            resolve(resultExcel2);
            // fs.writeFile($outPath, resultExcel2, 'binary', function(err: any) {
            //   if (err) {
            //     reject(err);
            //   } else {
            //     const excelcUrl = `http://localhost:8089/public/exportExcel/${$fileName}`;
            //     resolve(excelcUrl);
            //   }
            // });
        });
    }
    __call() {
        return this.fail(404, 'init_controller');
    }
}
