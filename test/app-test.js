const { STATUS_CODES } = require('http')
const sinon = require('sinon')
const chai = require('chai')

chai.use(require('chai-http'))
chai.use(require('sinon-chai'))

chai.should()

const app = require('../src/app')

describe('app', () => {
  it('should redirect to README.md on / GET', async () => {
    try {
      await chai.request(app).get('/').redirects(0) // Do not follow redirects
    } catch ({ response: res }) {
      res.status.should.equal(302)
      res.header.location.should.include('README.md')
    }
  })

  it('should process errors as expected', async () => {
    sinon.spy(console, 'error')

    try {
      await chai.request(app).get('/404')
    } catch ({ response: res }) {
      console.error.should.have.been.calledWith(STATUS_CODES[404])

      res.status.should.equal(404)
      res.type.should.equal('application/json')
      res.body.status.should.equal('error')
      res.body.message.should.equal(STATUS_CODES[404])
    }

    console.error.restore()
  })
})
