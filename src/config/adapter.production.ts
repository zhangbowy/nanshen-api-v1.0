import 'thinkjs3-ts';
import path from 'path';
const mysql = require('think-model-mysql');
const redisCache = require('think-cache-redis');
const {File, DateFile} = require('think-logger3');
import { think } from "thinkjs";
/**
 * 正式环境数据库配置
 */
exports.model = {
    type: 'mysql',
    common: {
        logConnect: false,
        logSql: false,
        logger: (msg: string) => think.logger.info(msg)
    },
    mysql: {
        handle: mysql,
        database: 'cxtest', // 数据库名
        prefix: '', // 表前缀
        encoding: 'utf8',
        host: '172.17.0.6', // host
        // host: '127.0.0.1',//host
        port: 3306, // 端口
        // user: 'root',//用户名
        user: 'root', // 用户名
        password: '$%75fsdfj', // 密码
        // password: 'd7DmpHNHD87PWYfR',//密码
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
        host: '172.17.32.3',
        port: '6379',
        password: 'fsf%%^^$AFDS5',
        log_connect: true
    }
};

exports.logger = {
    type: 'dateFile',
    dateFile: {
        handle: DateFile,
        level: 'ALL',
        // level: 'ERROR',
        absolute: true,
        pattern: '-yyyy-MM-dd',
        alwaysIncludePattern: false,
        filename: path.join(think.ROOT_PATH, 'logs/now.log')
    }
};
