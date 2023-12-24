import { expect } from 'chai';
import sinon from 'sinon';
import roomReviewService from '../service/roomReviewService';
import roomReviewRepository from '../repository/roomReviewRepository';
import RoomReview from '../models/RoomReview';

describe('RoomReview Service', () => {
  describe('create', () => {
    it('should create a new review and return it', async () => {
      const mockReviewRequest = { 
        id:1,
        author_id: 1, 
        room_id: 1, 
        review: 'Great room!'
      };
      const mockReview = {  ...mockReviewRequest };

      const stub = sinon.stub(roomReviewRepository, 'create').returns(Promise.resolve<any>(mockReview));
      const review = await roomReviewService.create(mockReviewRequest);

      expect(review).to.equal(mockReview);
      expect(stub.calledOnce).to.be.true;
    });
  });

  describe('getAll', () => {
    it('should return all reviews', async () => {
      const mockReviews = [
        { 
          id: 1, 
          author_id: 1, 
          room_id: 1, 
          review: 'Great room!'
        },
        { 
          id: 2, 
          author_id: 2, 
          room_id: 2, 
          review: 'Nice room!'
        },
      ];

      const stub = sinon.stub(roomReviewRepository, 'getAll').returns(Promise.resolve<any[]>(mockReviews));
      const reviews = await roomReviewService.getAll(1, 10);

      expect(reviews).to.equal(mockReviews);
      expect(stub.calledOnce).to.be.true;
    });
  });

  describe('getById', () => {
    it('should return the review with the given id', async () => {
      const mockReview = { 
        id: 1, 
        author_id: 1, 
        room_id: 1, 
        review: 'Great room!'
      };

      const stub = sinon.stub(roomReviewRepository, 'getById').returns(Promise.resolve<any>(mockReview));
      const review = await roomReviewService.getById(1);

      expect(review).to.equal(mockReview);
      expect(stub.calledOnce).to.be.true;
    });
  });

  describe('deleteById', () => {
    it('should delete the review with the given id', async () => {
      const stub = sinon.stub(roomReviewRepository, 'deleteById').returns(Promise.resolve());

      await roomReviewService.deleteById(1);

      expect(stub.calledOnce).to.be.true;
    });
  });
});
