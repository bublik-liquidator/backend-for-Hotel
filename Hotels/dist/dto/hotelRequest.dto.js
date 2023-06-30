"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelRequest = void 0;
class HotelRequest {
    constructor(model) {
        this.name = model.name;
        this.manager_id = model.manager_id;
        this.path_picture = model.path_picture;
    }
}
exports.HotelRequest = HotelRequest;
