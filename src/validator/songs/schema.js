const Joi = require('joi')

const songsPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().required(),
  performer: Joi.string().required(),
  genre: Joi.string().required(),
  duration: Joi.number(),
  albumid: Joi.string()
})
module.exports = { songsPayloadSchema }
