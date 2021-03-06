const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {

  const query = `SELECT * FROM lyrics_fragments JOIN songs ON lyrics_fragments.song_id = songs.song_id JOIN albums ON songs.album_id = albums.album_id ORDER BY lyrics_fragments.song_id ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Getting fragments', err);
      res.sendStatus(500)
    })
});

// router.get('/song_of_lines:id', (req, res) => {
//   const query = `SELECT * FROM lyrics_fragments JOIN songs ON lyrics_fragments.song_id = songs.song_id JOIN albums ON albums.album_id = songs.album_id WHERE lyric_fragments.song_id=$1`;
//   const values = [req.params.id];
//   pool.query(query, values)
//     .then( result => {
//       console.log('req params', req.params);
//       res.send(result.rows);
//     })
//     .catch(err => {
//       console.log('ERROR: Getting that song', err);
//       res.sendStatus(500)
//     })
// });

/**
 * POST route template
 */
// router.post('/saved_lines', (req, res) => {
//   console.log('req.body:', req.body);
//   const saveLine = `
//   INSERT INTO "saved_fragments" ("fragment_id", "user_id")
//   VALUES ($1, $2)`;
//   pool.query(saveLine, [req.body.fragment_id, req.body.user_id])
//   .then(result => {
//     console.log('added to saved_fragments');
//   }).catch(err => {
//     console.log('problem adding fragment', err);
//     res.sendStatus(500);
//   })
//   // POST route code here
// });

module.exports = router;


//JOIN songs ON lyrics_fragments.song_id = songs.song_id