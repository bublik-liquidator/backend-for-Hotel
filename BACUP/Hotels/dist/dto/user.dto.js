"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTO = void 0;
class UserDTO {
    constructor(model) {
        this.id = model.id;
        this.username = model.username;
        this.password = model.password;
        this.photo = model.photo;
        this.many = model.many;
        this.birthday = model.birthday;
        this.phonenomber = model.phonenomber;
        this.email = model.email;
        this.login = model.login;
    }
}
exports.UserDTO = UserDTO;
