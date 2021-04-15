import { think } from 'thinkjs';

export default class extends think.Logic {
    static get _REST() {
        return true;
    }

    constructor(ctx: any) {
        super(ctx);
    }
    __before() {
        this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
        this.header("Access-Control-Allow-Headers", ["x-requested-with", 'origin',  'content-type', 'design_sign', 'adm_sign']);
        this.header("Access-Control-Request-Method", "GET,POST,PUT,DELETE,OPTIONS");
        this.header('Access-Control-Allow-Credentials', true);
        this.header('X-Powered-By', 'thinkphp5.0');
        // this.allowMethods = 'post';
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
        return false;
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
        return false
    }


    __call() {
         return this.display('error/404.html');
        // return this.$fail(404, 'adm_logic');
    }

}
