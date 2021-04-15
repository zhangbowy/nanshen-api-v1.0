import Base from './base.js';
// @ts-ignore
import ThinkSvgCaptcha from 'think-svg-captcha';
import {think} from "thinkjs";

export default class extends think.Controller {
    async getListAction() {
        const result =  await think.model('order_info').select();
        this.success(result);
    }

}
