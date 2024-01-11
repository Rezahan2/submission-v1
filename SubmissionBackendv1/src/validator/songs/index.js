const InvariantError = require('../../exeptions/invariantError')
const { songsPayloadSchema } = require('./schema')

const SongsValidator = {
  validateSongsPayload: (payload) => {
    const validationResult = songsPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  }
}
module.exports = SongsValidator
