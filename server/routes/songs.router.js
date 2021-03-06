const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {

  const query = `SELECT * FROM songs ORDER BY "song_id" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all songs', err);
      res.sendStatus(500)
    })
});

router.get('/details/:id', (req, res) => {
  console.log('req params', req.params);
  const queryString = `SELECT * FROM songs WHERE songs.song_id=$1`;
  const values = [req.params.id];
  pool.query(queryString, values)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Getting that song', err);
      res.sendStatus(500)
    })
});

/**
 * POST route template
 */
router.post('/songs', (req, res) => {
  // POST route code here
});

module.exports = router;
