'use strict'

/* DISCLAIMER! */
// This code doesn't verify a uniqueness of a username.
// Therefor multiple users can use the same username and overwrite other user scores.
// This is obviously not ideal but is just for the sake of implementing Restful API

const mongoose = require('mongoose')
const Boom = require('@hapi/boom')
const Score = require('../models/Score')

module.exports = (function () {
  return [
    {
      method: 'GET',
      path: '/api/scores',
      handler: (req, h) => {
        return Score.find((err, res) => {
          if (err) {
            return Boom.badRequest('no score found', err)
          }

          return {
            username: res.username,
            total: res.total,
            date: res.date,
          }
        })
      },
    },
    {
      method: 'PUT',
      path: '/api/score',
      handler: async (req, h) => {
        const score = await Score.findOneAndUpdate(
          { username: req.payload.username },
          { total: req.payload.total, date: new Date() },
          (err, res) => {
            if (err) {
              throw Boom.badImplementation('error finding score', err)
            }

            return res
          }
        )

        if (!score) {
          const score = new Score()
          score.username = req.payload.username
          score.total = req.payload.total
          score.date = new Date()

          const newScore = await score.save()
          if (newScore) {
            return h.response('successfully added score value').code(200)
          }
        } else {
          return h.response('successfully updated score value').code(200)
        }
      },
    },
  ]
})()
