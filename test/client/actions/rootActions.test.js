import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../../app/actions/RootActions'
import nock from 'nock'
import { expect } from 'chai'
import 'isomorphic-fetch' 

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const reactRouterAction = {
  "payload": {
  	"args": [
  		null,
  		"/",
  		"",
  		],
  	"method": "pushState"
  },
	"type": "@@reduxReactRouter/historyAPI"
}
describe('root actions', ()=>{
  afterEach(()=>{
    nock.cleanAll()
  })

  it('creates signInSuccess when userSignIn has been done', (done)=>{
    var response = {}
    nock("http://localhost:3000")
      .post('/api/auth/local')
      .reply(200, response)

    const expectedActions = [
      { type: actions.SIGN_IN_SUCCESS, userInfo: response},
      reactRouterAction
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.userSignIn({},"token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done)
  })

  it('creates signInFailure when userSignIn has failed', (done)=>{
    var response = {}
    nock('http://localhost:3000')
      .post('/api/auth/local')
      .reply(400, response)

    const expectedActions = [
      { type: actions.SIGN_IN_FAILURE, error: actions.SIGN_IN_ERROR}
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.userSignIn({}, "token"))
      .then(()=>{
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
      .then(done)
      .catch(done)
  })

})
