'use strict'

class npsClass {
  static score (promoters, detractors, totalAnswers) {
    return Number((((promoters - detractors) / totalAnswers) * 100).toFixed(2))
  }
}

module.exports = npsClass