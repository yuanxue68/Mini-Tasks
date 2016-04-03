import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../../app/actions/BoardActions.js'
import nock from 'nock'
import { expect } from 'chai'
import 'isomorphic-fetch' 

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('board actions', ()=>{
  afterEach(()=>{
    nock.cleanAll()
  })

  it('creates getBoardSuccess when getBoard has been done', (done)=>{
    var response = {"_id":"1","name":"books to read","description":"assfsadas","owner":"10153308570456828","__v":0,"members":[]}
    nock("http://localhost:3000")
      .get('/api/boards/1')
      .reply(200, response)

    const expectedActions = [
      { type: actions.GET_BOARD_SUCCESS, boardInfo: response }
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.getBoard(1,"token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done)
  })


})
