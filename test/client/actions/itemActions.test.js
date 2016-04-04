import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../../app/actions/ItemActions'
import nock from 'nock'
import { expect } from 'chai'
import 'isomorphic-fetch' 

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('item actions', ()=>{
  afterEach(()=>{
    nock.cleanAll()
  })

  it('creates createItemSuccess when createItem has been done', (done)=>{
    var response = {}
    nock("http://localhost:3000")
      .post('/api/items')
      .reply(200, response)

    const expectedActions = [
      { type: actions.CREATE_ITEM_SUCCESS, item: response }
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.createItem({},"token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done)
  })

  it('creates createItemFailure when createItem has failed', (done)=>{
    var response = {}
    nock("http://localhost:3000")
      .post('/api/items')
      .reply(400, response)

    const expectedActions = [
      { type: actions.CREATE_ITEM_FAILURE, error: actions.CREATE_ITEM_ERROR }
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.createItem({},"token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done)
  })

  it('creates deleteItemSuccess when deleteItem has been done', (done)=>{
    var response = {}
    var itemListId = 1
    var itemId = 1
    nock("http://localhost:3000")
      .delete('/api/items/1')
      .reply(200, response)

    const expectedActions = [
      { type: actions.DELETE_ITEM_SUCCESS, itemListId, itemId }
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.deleteItem(itemId, itemListId, "token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done)
  })

  it('creates deleteItemFailure when deleteItem has failed', (done)=>{
    var response = {}
    var itemListId = 1
    var itemId = 1
    nock("http://localhost:3000")
      .delete('/api/items/1')
      .reply(400, response)

    const expectedActions = [
      { type: actions.DELETE_ITEM_FAILURE, error: actions.DELETE_ITEM_ERROR }
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.deleteItem(itemId, itemListId, "token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done)
  })


})
