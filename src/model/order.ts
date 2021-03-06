import { think } from 'thinkjs';
interface GetUserParams {
    id: number;
}
interface AddUserParams {
    name: string;
    phone: number;
    pwd: string;
}

export default class extends think.Model {
    get relation() {
        return {
            order_item: {
                type: think.Model.HAS_MANY,
                Model: 'order_item',
                fKey: 'order_id',
                key: 'id',
                // field: 'shop_id,phone,name',
                // where: {role_type: ['NOTIN', '1'], del: 0},
            },
            user: {
                type: think.Model.HAS_ONE,
                Model: 'user',
                fKey: 'id',
                key: 'user_id',
            },
            designer: {
                type: think.Model.HAS_ONE,
                Model: 'designer',
                fKey: 'designer_id',
                key: 'designer_id',
                field: 'designer_id,designer_team_id,designer_name,designer_phone,is_leader',
            },
        };
    }
    async getOrderFee($where: any) {
        // let sql = 'select date_format(created_at,'+"'%Y-%m-%d'"+') days from `order` group by `days`  UNION  ' +
        //     'SELECT ' +
        //     'datelist  as days ' +
        //     'FROM ' +
        //     '`calendar` ';
        //
        // let order_count = 'SELECT ' +
        //     '    date(dday) date, ' +
        //     '    sum(count) as count ' +
        //     'FROM' +
        //     '    ( ' +
        //     '        SELECT ' +
        //     '            datelist as dday, pay_amount as count' +
        //     '        FROM ' +
        //     '            calendar ' +
        //     '            where  DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= date(datelist)&&date(datelist)<=CURDATE() ' +
        //     '        UNION ALL ' +
        //     '            SELECT ' +
        //     '                created_at ,pay_amount as count ' +
        //     '            FROM  ' +
        //     '               `order` where  `status` NOT IN (1,-2,5,6)'+
        //     '    ) a ' +.

        //     'GROUP BY date';

        const order_fee = 'SELECT ' +
            '    date(dday) date, ' +
            '    sum(count) as count ' +
            'FROM' +
            '    ( ' +
            '        SELECT ' +
            '            datelist as dday, pay_amount as count' +
            '        FROM ' +
            '            calendar ' +
            '            where  DATE_SUB(CURDATE(), INTERVAL 6 DAY) <= date(datelist)&&date(datelist)<=CURDATE()' +
            '        UNION ALL ' +
            '            SELECT ' +
            '                created_at ,pay_amount as count ' +
            '            FROM  ' +
            '               `order` where ' +
            `shop_id=${$where.shop_id} and DATE_SUB(CURDATE(), INTERVAL 6 DAY) <= date(created_at)&&date(created_at)<=CURDATE() and` +
            ' `status` NOT IN (1,-2,5,6)' +
            '    ) a ' +
            'GROUP BY date';
        const res_fee = await this.query(order_fee);
        const date = [];
        const count = [];
        for (const item of res_fee) {
            date.push(item.date);
            count.push(item.count);
        }
        const result = {
            date,
            count
        };
        return result;
    }
    async getOrderCount($where: any) {
        // let sql = 'select date_format(created_at,'+"'%Y-%m-%d'"+') days from `order` group by `days`  UNION  ' +
        //     'SELECT ' +
        //     'datelist  as days ' +
        //     'FROM ' +
        //     '`calendar` ';

        const order_count = 'SELECT ' +
            '    date(dday) date, ' +
            '    count(*)-1 as count ' +
            'FROM' +
            '    ( ' +
            '        SELECT ' +
            '            datelist as dday ' +
            '        FROM ' +
            '            calendar ' +
            '            where  DATE_SUB(CURDATE(), INTERVAL 6 DAY) <= date(datelist)&&date(datelist)<=CURDATE() ' +
            '        UNION ALL ' +
            '            SELECT ' +
            '                created_at ' +
                '            FROM  ' +
            '               `order` where ' +
            `shop_id=${$where.shop_id} and DATE_SUB(CURDATE(), INTERVAL 6 DAY) <= date(created_at)&&date(created_at)<=CURDATE() and` +
            ' `status` NOT IN (1,-2,5,6)' +
            '    ) a ' +
            'GROUP BY date';

        // let order_fee = 'SELECT ' +
        //     '    date(dday) date, ' +
        //     '    sum(count) as count ' +
        //     'FROM' +
        //     '    ( ' +
        //     '        SELECT ' +
        //     '            datelist as dday, pay_amount as count' +
        //     '        FROM ' +
        //     '            calendar ' +
        //     '            where  DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= date(datelist)&&date(datelist)<=CURDATE() ' +
        //     '        UNION ALL ' +
        //     '            SELECT ' +
        //     '                created_at ,pay_amount as count ' +
        //     '            FROM  ' +
        //     '               `order` where  `status` NOT IN (1,-2,5,6)'+
        //     '    ) a ' +
        //     'GROUP BY date';
        // let a =  await this.getField('created_at,id');
        const res_count = await this.query(order_count);
        const date = [];
        const count = [];
        for (const item of res_count) {
            date.push(item.date);
            count.push(item.count);
        }
        const result = {
            date,
            count
        };
        return result;
    }
    async getOrderAmount($where: any) {
        // let sql = 'select date_format(created_at,'+"'%Y-%m-%d'"+') days from `order` group by `days`  UNION  ' +
        //     'SELECT ' +
        //     'datelist  as days ' +
        //     'FROM ' +
        //     '`calendar` ';
        //
        // let order_count = 'SELECT ' +
        //     '    date(dday) date, ' +
        //     '    sum(count) as count ' +
        //     'FROM' +
        //     '    ( ' +
        //     '        SELECT ' +
        //     '            datelist as dday, pay_amount as count' +
        //     '        FROM ' +
        //     '            calendar ' +
        //     '            where  DATE_SUB(CURDATE(), INTERVAL 7 DAY) <= date(datelist)&&date(datelist)<=CURDATE() ' +
        //     '        UNION ALL ' +
        //     '            SELECT ' +
        //     '                created_at ,pay_amount as count ' +
        //     '            FROM  ' +
        //     '               `order` where  `status` NOT IN (1,-2,5,6)'+
        //     '    ) a ' +.

        //     'GROUP BY date';

        const order_fee = 'SELECT ' +
            '    date(dday) date, ' +
            '    sum(count) as count, ' +
            '    count(count) - 1 as order_count ' +
            'FROM' +
            '    ( ' +
            '        SELECT ' +
            '            datelist as dday, pay_amount as count' +
            '        FROM ' +
            '            calendar ' +
            `            where  date('${$where.start_time}') <= date(datelist)&&date(datelist)<=date('${$where.end_time || "CURDATE()"}')` +
            '        UNION ALL ' +
            '            SELECT ' +
            '                created_at ,pay_amount as count ' +
            '            FROM  ' +
            '               `order` where ' +
            `shop_id=${$where.shop_id} and date('${$where.start_time}') <= date(created_at)&&date(created_at)<= date('${$where.end_time || "CURDATE()"}') and` +
            ' `status` NOT IN (1,-2,5,6)' +
            '    ) a ' +
            'GROUP BY date';
        const res_fee = await this.query(order_fee);
        const date = [];
        const count = [];
        const order_count = [];
        let total_amount = 0;
        let total_count = 0;
        for (const item of res_fee) {
            date.push(item.date);
            count.push(item.count);
            order_count.push(item.order_count);
            total_amount += item.count;
            total_count += item.order_count;
        }

        const result = {
            date,
            amount: count,
            count: order_count,
            total_amount,
            total_count
        };
        return result;
    }
    async getCount($ids: any) {
        const str = $ids.join(',');
        const sql = 'select  count(*) as count,status from `order` where `id` IN (' + str + ') group by status';
        const a = await this.query(sql);
        return  a;
    }
    getPayAmount() {
        'select created_at from `order` where to_days(now()) - to_days(created_at) <= 3'
    }
}
