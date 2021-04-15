import Base from './base.js';
// import {think} from "thinkjs";
import DDBot from "./../utils/dd";
// import {think} from "thinkjs";
import * as thinkjs from "thinkjs";
const path  = require('path');
const fs  = require('fs');
export default class extends think.Controller {

    /**
     * 男神oss上传(私有部署的oss上传)
     * @desc 每天12点半定时任务读取当天的文件夹遍历上传
     * @tip 本来想着挺多 拿之前写过的thinkjs改改了 竟然就这一个功能，不过后端嘛，问题不大，要是加更方便 害，就这样吧，其实也不影响。
     * 调试单个action  命令行 node development.js /nanshen/ossUpload
     * @action 执行方法 1、加到linux系统定时任务crontab  2、用thinkjs自带的定时任务 /src/config/crontab.ts 配置一下就好 也挺方便
     */
    async ossUploadAction(): Promise<void> {
        /**
         * 记录开始时间
         */
        const start_time: string = think.datetime(new Date().getTime(), 'YYYY-MM-DD HH:mm:ss');
        try {
            // const dir_path = this.get('dir_path') ||
            /**
             * 实例 oss service
             */
            const Oss: any = think.service('oss');
            // const filePath = path.join(think.ROOT_PATH, 'data1');
            /**
             * 男神给的的oss key的前缀
             */
            const prefix: string = '/native/jiangsu002';
            /**
             * 本地服务器上传根路径
             */
            const root_path: string = this.get('dir_path') || '/home/gallery/';
            /**
             * 获取当天日期 例如 20210208
             */
            const day: string = think.datetime(new Date().getTime(), 'YYYYMMDD');
            /**
             * 当天日期的文件夹 例如 /home/gallery/20210208
             */
            const filePath: string = root_path + day;
            console.log('dirPath', filePath);
            /**
             * 判断当天日期的文件夹是否存在
             * 存在上传、不存在钉钉推送文件夹不存在
             */
            const isDir: boolean = fs.existsSync(filePath);
            let content: string = '';
            let success: number = 0;
            /**x
             * 文件夹存在
             */
            if (isDir) {
                /**
                 * 读取文件夹，获取文件列表
                 */
                const distDir: string[] = await fs.readdirSync(filePath);
                const url: any[] = [];
                for (const item of distDir) {
                    if (/.log/.test(item)) { continue; }
                    /**
                     * 当前循环文件的具体路径
                     * 文件夹路径 + 文件名
                     */
                    const currentPath: string = path.join(filePath, item);
                    // const day1 = think.datetime(new Date().getTime(), 'YYYY-MM-DD');
                    /**
                     * oss里的key
                     * 前缀 + 日期 + 文件名
                     */
                    const fileName: string = `${prefix}/${day}/${item}`;
                    /**
                     * 上传
                     * @tip这边还能改改
                     */
                    await Oss.upload(currentPath, fileName, false);
                    url.push(item);
                }
                content = `${JSON.stringify(url)} , 等${url.length}个文件!`;
                // await think.timeout(2000);
                success = 1;
            } else {
                /**
                 * 当文件夹不存在
                 */
                content = `文件夹${filePath}不存在`;
            }
            /**
             * 发送钉钉通知
             */
            this.ddBot(content, start_time, success);
            // think.logger('执行完成!');
        } catch ($err) {
            console.log($err);
            this.ddBot($err.message, start_time, 0);
            // this.fail($err);
        }
    }

    /**
     * 钉钉机器人群消息推送
     * @param $msg
     * @param $start_time
     * @param $success
     */
    ddBot($msg: string, $start_time: string, $success: number) {
        const end_time: string = think.datetime(new Date().getTime(), 'YYYY-MM-DD HH:mm:ss');
        const msg: string = "### 通知\n" +
            '--- \n' +
        "- 开始时间： " + $start_time + '\n' +
        "- 完成时间： " + end_time + '\n' +
        `- 内容： ${$msg}\n` +
        `- 状态： ${$success ? '<font  color=green>成功!</font>' : '<font color=red>失败!</font>' }\n`;
        const web_hook: string = 'https://oapi.dingtalk.com/robot/send?access_token=87a81fd90abf8b44dbbed2fb26c3bde7a9af9cc0fe4fccea90fae44a46a5f90a';
        const ddServer = new DDBot(web_hook);
        ddServer.pushMsg(msg);
    }

    /**
     * testDetail
     */
    async test1Action() {
        try {
            await this.test2();
            await this.test3();
        } catch (e) {
            console.log(e, '最上层catch捕获');
        }
    }
    async test2() {

    }

    async test3() {
        await this.test4();
    }

    async test4() {
        await this.test5();
    }

    async test5() {
        throw new Error('from test5');
    }


    async getExcel() {

    }
}
