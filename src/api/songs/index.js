const SongsHandler = require('./handler')
const routesSongs = require('./routes')

module.exports = {
  name: 'SongsApi',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const songsHandler = new SongsHandler(service, validator)
    server.route(routesSongs(songsHandler))
  }
}
