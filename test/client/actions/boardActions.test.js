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

  it('creates getBoardFailure when getBoard false', (done)=>{
    var response = actions.GET_BOARD_ERROR
    nock('http://localhost:3000')
      .get('/api/boards/1')
      .reply(400, response)

    const expectedActions = [
      { type: actions.GET_BOARD_FAILURE, error: response}
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.getBoard(1, "token"))
      .then(()=>{
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
      .then(done)
      .catch(done)
  })

 it('creates editBoardSuccess when editBoard is done', (done)=>{
    var boardInfo = {_id:1, name:"name", description: "description"}
    nock('http://localhost:3000')
      .put('/api/boards/1')
      .reply(200, boardInfo)

    const expectedActions = [
      { type: actions.EDIT_BOARD_SUCCESS, boardInfo, notification: actions.EDIT_BOARD_MESSAGE}
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.editboard(boardInfo, "token"))
      .then(()=>{
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
      .then(done)
      .catch(done)
  })

 it('creates editBoardFailure when editBoard fails', (done)=>{
    var boardInfo = {_id:1, name:"name", description: "description"}
    nock('http://localhost:3000')
      .put('/api/boards/1')
      .reply(400, boardInfo)

    const expectedActions = [
      { type: actions.EDIT_BOARD_FAILURE, error: actions.EDIT_BOARD_ERROR}
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.editboard(boardInfo, "token"))
      .then(()=>{
        expect(store.getActions()).to.deep.equal(expectedActions)
      })
      .then(done)
      .catch(done)
  })


})
