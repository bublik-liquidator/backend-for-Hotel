export class RoomReviewDTO {
    id!: number;
    author_id!: number;
    room_id!: number;
    review!: string;
  
    constructor(model: RoomReviewDTO) {
      this.id = model.id;
      this.author_id = model.author_id;
      this.room_id = model.room_id;
      this.review = model.review;
    }
  }
  