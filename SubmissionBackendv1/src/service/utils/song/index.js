const mapDBToModelSongs = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId

}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId
})

module.exports = { mapDBToModelSongs }
