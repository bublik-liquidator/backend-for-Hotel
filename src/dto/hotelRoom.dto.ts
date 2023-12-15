export class HotelRoomDTO {
    id!:number
    hotel_id!:number;
    number!:string;
    description!:string;
    price!:number;
    name!:string;
    path_picture!:string;

    constructor(model:HotelRoomDTO ) {
      this.name=model.name;
        this.id = model.id
        this.path_picture= model.path_picture
        this.hotel_id = model.hotel_id
        this.number = model.number
        this.description = model.description
        this.price = model.price
      }
}
