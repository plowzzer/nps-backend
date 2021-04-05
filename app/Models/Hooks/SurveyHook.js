'use strict'

const { v4: uuidv4 } = require('uuid')

const SurveyHook = exports = module.exports = {}

SurveyHook.uuid = async (survey) => {
  survey.uuid = uuidv4()
}
