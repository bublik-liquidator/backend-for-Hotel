export class HotelRoomRequest {
  id!:bigint
  hotel_id!:bigint;
  number!:string;
  description!:string;
  price!:number;
  name!: string;
  path_picture!:string

  constructor(model:HotelRoomRequest ) {
      this.id = model.id
      this.name = model.name
      this.path_picture= model.path_picture
      this.hotel_id = model.hotel_id
      this.number = model.number
      this.description = model.description
      this.price = model.price
    }
}
