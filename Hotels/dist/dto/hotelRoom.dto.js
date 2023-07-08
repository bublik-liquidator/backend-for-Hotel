"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelRoomDTO = void 0;
class HotelRoomDTO {
    constructor(model) {
        this.name = model.name;
        this.id = model.id;
        this.path_picture = model.path_picture;
        this.hotel_id = model.hotel_id;
        this.number = model.number;
        this.description = model.description;
        this.price = model.price;
    }
}
exports.HotelRoomDTO = HotelRoomDTO;
