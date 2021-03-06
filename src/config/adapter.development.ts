import 'thinkjs3-ts';
const mysql = require('think-model-mysql');
const redisCache = require('think-cache-redis');
import { think } from "thinkjs";
/**
 * 开发环境数据库配置
 */
exports.model = {
    type: 'mysql',
    common: {
        logConnect: true,
        logSql: true,
        logger: (msg: string) => think.logger.info(msg)
    },
    mysql: {
        handle: mysql,
        // database: 'luckycat_test', //数据库名
        database: 'luckycat_test', // 数据库名
        prefix: '', // 表前缀
        encoding: 'utf8',
        host: '121.40.85.62', // host
        port: 26597, // 端口
        user: 'root', // 用户名
        password: 'kdv8XbhTKMQH2Na0', // 密码
        dateStrings: true,
        // acquireWaitTimeout: 3000,
        debounce: false,
        connectionLimit: 30,
        charset: 'utf8mb4'
    }
};

exports.cache = {
    type: 'redis',
    common: {
        timeout: 24 * 3600 * 1000 // millisecond
    },
    redis: {
        handle: redisCache,
        host: '127.0.0.1',
        // host: '192.168.31.3',
        port: '6379',
        password: '',
        log_connect: true
    }
};
