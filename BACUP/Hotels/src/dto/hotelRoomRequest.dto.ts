export class HotelRoomRequest {
  id!:bigint
  hotel_id!:bigint;
  number!:string;
  description!:string;
  price!:number;

  constructor(model:HotelRoomRequest ) {
      this.id = model.id
      this.hotel_id = model.hotel_id
      this.number = model.number
      this.description = model.description
      this.price = model.price
    }
}
