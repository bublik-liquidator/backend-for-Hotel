import db from "../config/dbProvider"


 async function checkIfRecordExists(roomId: string) {
  const query = {
    text: 'SELECT EXISTS(SELECT 1 FROM room_booking WHERE room_id = $1)',
    values: [roomId],
  };

  const result = await db.pool.query(query);
  return result.rows[0].exists;
}


import express from 'express';

const router = express.Router();

router.get('/:roomId', async (req, res) => {
  const roomId = req.params.roomId;
  const exists = await checkIfRecordExists(roomId);
  res.json({ exists });
});
export default router;

