const mapDBToModelSongs = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumid

}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumid
})
const mapDBToModelGetSongs = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumid

}) => ({
  id,
  title,
  year
})
module.exports = { mapDBToModelSongs, mapDBToModelGetSongs }
