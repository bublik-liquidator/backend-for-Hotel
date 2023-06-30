"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRequest = void 0;
class UserRequest {
    constructor(model) {
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
exports.UserRequest = UserRequest;
