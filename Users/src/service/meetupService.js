const meetupRepository = require('../repository/meetupsRepository');

async function getAll(page, limit) {  
  return await meetupRepository.getAll(page, limit);
}

function save(req, res) {
  return meetupRepository.save(req, res);
}

function getById(meetupId) {
  return meetupRepository.getById(parseInt(meetupId, 10));
  // const result = await meetupRepository.getById(meetupId);
  // console.log(result)
  // return result;
}

function deleteById(meetupId) {
  return meetupRepository.deleteById(parseInt(meetupId, 10));
}

module.exports = {
  getAll,
  getById,
  save,
  deleteById,
};