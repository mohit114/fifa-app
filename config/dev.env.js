'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ADMIN_ID: '"z97DLBnQeeZN6gmj1rknOQm3nEh2"',
  ROOT_API: '"http://localhost:3000"',
  GROUP_1: '"Nepasoft"',
  GROUP_2: '"Tole"',
  GROUP_3: '"KTM Rush"',
  GROUP_4: '"BikeStation"',
  GROUP_5: '"101bokas"',
  GROUP_6: '"dipu"'
})
