import { think } from 'thinkjs';

export default class extends think.Model {

   get pk() {
        return 'color_id';
   }
    async getUserById($id: number) {
        return await this.where({id: $id}).find();
    }
}
