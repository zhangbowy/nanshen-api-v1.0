import { think } from 'thinkjs';
interface GetUserParams {
    id: number;
}
export default class extends think.Model {
    async getUserById($id: string) {
        return await this.where({id: $id}).find();
    }
    get pk() {
        return 'import_rechange_id';
    }
}
