export class HotelRequest {
  name!: string;
  manager_id!: number;
  path_picture!: string[];

  constructor(model: HotelRequest) {
    this.name = model.name;
    this.manager_id = model.manager_id;
    this.path_picture = model.path_picture;
  }
}