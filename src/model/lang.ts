import { think } from 'thinkjs';
interface GetUserParams {
    id: number;
}
export default class extends think.Model {
    get pk() {
        return 'lang_id';
    }
}
