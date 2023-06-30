"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomBooking = void 0;
class RoomBooking {
    constructor(model) {
        this.id = model.id;
        this.room_id = model.room_id;
        this.booked_by_user_id = model.booked_by_user_id;
        this.date_from = model.date_from;
        this.date_to = model.date_to;
        this.payed = model.payed;
        this.number = model.number;
        this.name = model.name;
    }
}
exports.RoomBooking = RoomBooking;
