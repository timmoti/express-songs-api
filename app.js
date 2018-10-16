const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const songs = [
  { id: 1, name: 'Hello', artist: 'Adele' },
  { id: 2, name: 'Sunday Morning', artist: 'Maroon 5' },
  { id: 3, name: 'Love Me', artist: 'Colin Raye' }
];

//get the entire list of data
app.get('/songs', function(req, res) {
  res.status(200).json(songs);
});

//look for a specific song from the database with all accompanying data based on songname
app.get('/songs/:id', function(req, res) {
  const songId = +req.params.id; //req.params looks at the current database
  const requestedSong = songs.find(song => song.id === songId);
  res.status(200).json(requestedSong);
});

//Add a new object to the database
app.post('/songs', function(req, res) {
  const songName = req.body.name; //req.body inputs data into the database
  const songArtist = req.body.artist;
  songs.push({ id: songs.length + 1, name: songName, artist: songArtist });
  res.status(201).json(songs);
});

//Changing an object in the database
app.put('/songs/:id', function(req, res) {
  let songsWithMatchingId = songs.filter(song => song.id === +req.params.id);
  let songToBeUpdated = songsWithMatchingId[0];

  songToBeUpdated['name'] = req.body.name;
  songToBeUpdated['artist'] = req.body.artist;

  res.status(200).json(songToBeUpdated);
});

//Deleting an object from the database
app.delete('/songs/:id', function(req, res) {
  let remainingSongs = songs.filter(song => song.id !== +req.params.id);
  res.status(200).json(remainingSongs);
});

const server = app.listen(PORT, function() {
  console.log(`You're listening to the smooth sounds of port ${PORT}.`);
});
