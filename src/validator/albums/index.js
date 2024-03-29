const InvariantError = require('../../exeptions/invariantError')
const { AlbumPayloadSchema } = require('./schema')

const AlbumsValidator = {
  validateAlbumsPayload: (payload) => {
    const validationResult = AlbumPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  }
}
module.exports = AlbumsValidator
