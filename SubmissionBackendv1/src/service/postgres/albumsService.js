const InvariantError = require('../../exeptions/invariantError')
const NotFoundError = require('../../exeptions/notFoundError')
const { Pool } = require('pg')
const { nanoid } = require('nanoid')

class AlbumsService {
  constructor () {
    this._pool = new Pool()
  }

  async addAlbum ({ name, year }) {
    const id = `album-${nanoid(16)}`

    const query = {
      text: 'INSERT INTO albums VALUES ($1,$2,$3) RETURNING id',
      values: [id, name, year]
    }

    const result = await this._pool.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('Catatan gagal ditambahkan')
    }

    return result.rows[0].id
  }

  async getAlbumByIdAlbumId (id) {
    const qAlbum = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id]
    }
    const aResult = await this._pool.query(qAlbum)
    if (!aResult.rows.length) {
      throw new NotFoundError('Lagu tidak ditemukan')
    }
    const album = aResult.rows[0]
    const qSong = {
      text: 'SELECT * FROM songs WHERE "albumId" = $1',
      values: [id]
    }
    const sresult = await this._pool.query(qSong)
    const song = sresult.rows
    const albumWithSongs = {
      id: album.id,
      name: album.name,
      year: album.year,
      songs: song.map(song => ({
        id: song.id,
        title: song.title,
        performer: song.performer
      }))
    }
    return albumWithSongs
  }

  async editAlbumById (id, { name, year }) {
    const query = {
      text: 'UPDATE albums SET name=$1, year=$2 WHERE id = $3 RETURNING id',
      values: [name, year, id]
    }
    const result = await this._pool.query(query)
    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan')
    }
  }

  async deleteAlbumById (id) {
    const query = {
      text: 'DELETE FROM albums WHERE id= $1 RETURNING id',
      values: [id]
    }
    const result = await this._pool.query(query)
    if (!result.rows.length) {
      throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan')
    }
  }
}
module.exports = AlbumsService
