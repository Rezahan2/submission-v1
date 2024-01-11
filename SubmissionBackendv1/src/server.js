require('dotenv').config()
const hapi = require('@hapi/hapi')
const ClientError = require('./exeptions/clientError')
const AlbumsApi = require('./api/albums')
const SongsApi = require('./api/songs')
const AlbumsValidator = require('./validator/albums')
const SongsValidator = require('./validator/songs')
const AlbumsService = require('./service/postgres/albumsService')
const SongsService = require('./service/postgres/songsService')

const init = async () => {
  const albumsService = new AlbumsService()
  const songsService = new SongsService()
  const server = hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  await server.register({
    plugin: AlbumsApi,
    options: {
      service: albumsService,
      validator: AlbumsValidator
    }
  })
  await server.register({
    plugin: SongsApi,
    options: {
      service: songsService,
      validator: SongsValidator
    }
  })
  server.ext('onPreResponse', (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request

    if (response instanceof Error) {
      // penanganan client error secara internal.
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message
        })
        newResponse.code(response.statusCode)
        return newResponse
      }

      // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
      if (!response.isServer) {
        return h.continue
      }

      // penanganan server error sesuai kebutuhan
      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami'
      })
      newResponse.code(500)
      return newResponse
    }

    // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return h.continue
  })

  await server.start()
  console.log(`Server berjalan pada ${server.info.uri}`)
}
init()
