import { think } from 'thinkjs';
import base from './base'

export default class extends base {
    authorityListAction() {

    }
    roleListAction() {

    }
    addRoleAction() {
        const rules = {
            admin_role_name: {
                string: true,
                required: true,
                method: 'post'
            },
            authority_list: {
                required: true,
                method: 'post',
                array: true
            },
        };
        const msgs: object = {
            required: '{name}不能为空'
        };
        if (!this.validate(rules, msgs)) { // 校验不通过
            const keys: string[] = Object.keys(this.validateErrors);
            const msg: string = this.validateErrors[keys[0]];
            return this.$fail(-1, ['{name}不能为空', {name: keys[0]}]);
        }
    }
    addAdminAction() {
        const rules = {
            name: {
                string: true,
                required: true,
                method: 'post'
            },
            phone: {
                string: true,
                required: true,
                method: 'post'
            },
            password: {
                string: true,
                required: true,
                method: 'post'
            },
            role_id: {
                required: true,
                method: 'post'
            }
        };
        const msgs: object = {
            required: '{name}不能为空'
        };
        if (!this.validate(rules, msgs)) { // 校验不通过
            const keys: string[] = Object.keys(this.validateErrors);
            const msg: string = this.validateErrors[keys[0]];
            return this.$fail(-1, ['{name}不能为空', {name: keys[0]}]);
        }
    }
    editAdminAction() {
        const rules = {
            id: {
                string: true,
                required: true,
                method: 'post'
            },
            name: {
                string: true,
                required: true,
                method: 'post'
            },
            phone: {
                string: true,
                required: true,
                method: 'post'
            },
            role_id: {
                required: true,
                method: 'post'
            }
        };
        const msgs: object = {
            required: '{name}不能为空'
        };
        if (!this.validate(rules, msgs)) { // 校验不通过
            const keys: string[] = Object.keys(this.validateErrors);
            const msg: string = this.validateErrors[keys[0]];
            return this.$fail(-1, ['{name}不能为空', {name: keys[0]}]);
        }
    }
    adminListAction() {

    }
    delAdminAction() {
        const rules = {
            id: {
                // string: true,
                required: true,
                method: 'post'
            }
        };
        const msgs: object = {
            required: '{name}不能为空'
        };
        if (!this.validate(rules, msgs)) { // 校验不通过
            const keys: string[] = Object.keys(this.validateErrors);
            const msg: string = this.validateErrors[keys[0]];
            return this.$fail(-1, ['{name}不能为空', {name: keys[0]}]);
        }
    }
    roleDetailAction() {
        const rules = {
            admin_role_id: {
                string: true,
                required: true,
                method: 'get'
            }
        };
        const msgs: object = {
            required: '{name}不能为空'
        };
        if (!this.validate(rules, msgs)) { // 校验不通过
            const keys: string[] = Object.keys(this.validateErrors);
            const msg: string = this.validateErrors[keys[0]];
            return this.$fail(-1, ['{name}不能为空', {name: keys[0]}]);
        }
    }
    editRoleAction() {
        const rules = {
            admin_role_id: {
                required: true,
                method: 'post'
            },
            admin_role_name: {
                string: true,
                required: true,
                method: 'post'
            },
            authority_list: {
                required: true,
                method: 'post'
            },
        };
        const msgs: object = {
            required: '{name}不能为空'
        };
        if (!this.validate(rules, msgs)) { // 校验不通过
            const keys: string[] = Object.keys(this.validateErrors);
            const msg: string = this.validateErrors[keys[0]];
            return this.$fail(-1, ['{name}不能为空', {name: keys[0]}]);
        }
    }
    delRoleAction() {
        const rules = {
            admin_role_id: {
                string: true,
                required: true,
                method: 'post'
            }
        };
        const msgs: object = {
            required: '{name}不能为空'
        };
        if (!this.validate(rules, msgs)) { // 校验不通过
            const keys: string[] = Object.keys(this.validateErrors);
            const msg: string = this.validateErrors[keys[0]];
            return this.$fail(-1, ['{name}不能为空', {name: keys[0]}]);
        }
    }
}
