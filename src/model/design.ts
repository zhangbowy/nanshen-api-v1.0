
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
    get pk() {
        return 'design_id';
    }

    get relation() {
        // const shop_id1: number = think.ctx.state.admin_info.shop_id;
        return {
            designer: {
                type: think.Model.HAS_ONE,
                // Model: 'emb_template',
                key: 'designer_id',
                fKey: 'designer_id',
                // order: 'price ASC'
                field: 'designer_id,avatar_url,designer_name,designer_phone',
                // where: {shop_id: shop_id1},
            },
        };
    }
}
