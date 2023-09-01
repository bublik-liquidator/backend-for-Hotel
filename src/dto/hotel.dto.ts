export class HotelDTO {
    id!:bigint
    name!:string;
    manager_id!:bigint; 
    path_picture!:string[]
    constructor(model:HotelDTO ) {
        this.id = model.id;
        this.name = model.name;
        this.manager_id = model.manager_id;
        this.path_picture = model.path_picture
      }
}
