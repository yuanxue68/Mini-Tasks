import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../../app/actions/MemberActions'
import nock from 'nock'
import { expect } from 'chai'
import 'isomorphic-fetch' 

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('member actions', ()=>{
  afterEach(()=>{
    nock.cleanAll()
  })

  it('creates getMembersSuccess when getMembers has been done', (done)=>{
    var response = {}
    nock("http://localhost:3000")
      .get('/api/boards/1/members')
      .reply(200, response)

    const expectedActions = [
      { type: actions.GET_MEMBERS_SUCCESS, members: response }
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.getMembers(1,"token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done)
  })

  it('creates getMembersFailure when getMembers has failed', (done)=>{
     var response = {}
    nock("http://localhost:3000")
      .get('/api/boards/1/members')
      .reply(400, response)

    const expectedActions = [
      { type: actions.GET_MEMBERS_FAILURE, error: actions.GET_MEMBERS_ERROR }
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.getMembers(1,"token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done)    
  })

  it('creates createMembersSuccess when createMembers has been done', (done)=>{
    var response = {}
    nock("http://localhost:3000")
      .post('/api/boards/1/members')
      .reply(200, response)

    const expectedActions = [
      { type: actions.CREATE_MEMBERS_SUCCESS, member: response, notification: actions.CREATE_MEMBERS_MESSAGE }
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.createMember(1, 1, "token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done)
  })

  it('creates createMembersFailure when createMembers has failed', (done)=>{
     var response = {}
    nock("http://localhost:3000")
      .post('/api/boards/1/members')
      .reply(400, response)

    const expectedActions = [
      { type: actions.CREATE_MEMBERS_FAILURE, error: actions.CREATE_MEMBERS_ERROR }
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.createMember(1,"token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done)    
  })

  it('creates deleteMembersSuccess when deleteMember has been done', (done)=>{
    var response = {}
    var userId = 1
    var boardId = 1
    nock("http://localhost:3000")
      .delete('/api/boards/1/members/1')
      .reply(200, response)

    const expectedActions = [
      { type: actions.DELETE_MEMBER_SUCCESS, userId }
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.deleteMember(boardId, userId, "token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done)
  })

  it('creates deleteMembersFailure when deleteMember has failed', (done)=>{
    var response = {}
    var userId = 1
    var boardId = 1
    nock("http://localhost:3000")
      .delete('/api/boards/1/members/1')
      .reply(400, response)

    const expectedActions = [
      { type: actions.DELETE_MEMBER_FAILURE, error: actions.DELETE_MEMBER_ERROR}
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.deleteMember(boardId, userId, "token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done)    
  })


})
