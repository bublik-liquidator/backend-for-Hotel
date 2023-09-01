"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelRoomRequest = void 0;
class HotelRoomRequest {
    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.path_picture = model.path_picture;
        this.hotel_id = model.hotel_id;
        this.number = model.number;
        this.description = model.description;
        this.price = model.price;
    }
}
exports.HotelRoomRequest = HotelRoomRequest;
