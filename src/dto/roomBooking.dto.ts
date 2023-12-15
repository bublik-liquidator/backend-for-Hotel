export class RoomBooking {
  id!: number
  room_id!: number;
  booked_by_user_id!: number;
  date_from!: string;
  date_to!: string;
  payed!: boolean;
  number!: string;
  name!: string;

  constructor(model: RoomBooking) {
    this.id = model.id
    this.room_id = model.room_id
    this.booked_by_user_id = model.booked_by_user_id
    this.date_from = model.date_from
    this.date_to = model.date_to
    this.payed = model.payed
    this.number = model.number
    this.name = model.name
  }
}
