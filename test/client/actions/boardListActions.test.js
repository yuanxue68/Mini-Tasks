import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../../app/actions/BoardListActions.js'
import nock from 'nock'
import { expect } from 'chai'
import 'isomorphic-fetch' 

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('board list actions', ()=>{
  afterEach(()=>{
    nock.cleanAll()
  })

  it('creates getBoardsSuccess when getBoard has been done', (done)=>{
    var response = []
    nock("http://localhost:3000")
      .get('/api/boards?owner=yuan')
      .reply(200, response)

    const expectedActions = [
      { type: actions.GET_BOARDS_SUCCESS, boardList: response }
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.getBoards({owner: "yuan"},"token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done)
  })
  
  it('creates getBoardsFailure when getBoard has failed', (done)=>{
    var response = []
    nock("http://localhost:3000")
      .get('/api/boards?owner=yuan')
      .reply(400, response)

    const expectedActions = [
      { type: actions.GET_BOARDS_FAILURE, error: actions.GET_BOARDS_ERROR}
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.getBoards({owner: "yuan"},"token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done)
  })
 
  it('creates createBoardSucess when createBoard has been done', (done)=>{
    var response = []
    nock("http://localhost:3000")
      .post('/api/boards')
      .reply(200, response)

    const expectedActions = [
      { type: actions.CREATE_BOARD_SUCCESS, boardInfo: response }
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.createBoard({}, "token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done)
  })

  it('creates createBoardSucess when createBoard has been done', (done)=>{
    var response = []
    nock("http://localhost:3000")
      .post('/api/boards')
      .reply(400, response)

    const expectedActions = [
      { type: actions.CREATE_BOARD_FAILURE, error: actions.CREATE_BOARD_ERROR }
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.createBoard({}, "token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done)
  })
  
  it('creates deleteBoardSuccess when deleteBoard has been done', (done)=>{
    var response = 1
    nock("http://localhost:3000")
      .delete('/api/boards/1')
      .reply(200, response)

    const expectedActions = [
      { type: actions.DELETE_BOARD_SUCCESS, boardId: response }
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.deleteBoard(1, "token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done)
  })

  it('create deleteBoardFailure when deleteBoard has failed', (done)=>{
    var response = 1
    nock("http://localhost:3000")
      .delete('/api/boards/1')
      .reply(400, response)

    const expectedActions = [
      { type: actions.DELETE_BOARD_FAILURE, error: actions.DELETE_BOARD_ERROR }
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.deleteBoard(1, "token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done) 
  })

})
