"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelDTO = void 0;
class HotelDTO {
    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.manager_id = model.manager_id;
        this.path_picture = model.path_picture;
        this.location = model.location;
        this.services = model.services;
    }
}
exports.HotelDTO = HotelDTO;
