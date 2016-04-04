import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../../app/actions/ItemListActions'
import nock from 'nock'
import { expect } from 'chai'
import 'isomorphic-fetch' 

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('board actions', ()=>{
  afterEach(()=>{
    nock.cleanAll()
  })

  it('creates getItemListsSuccess when getItemLists has been done', (done)=>{
    var response = {itemLists:[], items: []}
    nock("http://localhost:3000")
      .get('/api/boards/1/itemLists')
      .reply(200, response)

    const expectedActions = [
      { type: actions.GET_ITEMLISTS_SUCCESS, itemLists: [] }
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.getItemLists(1,"token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done)
  })

  it('creates getItemListsSuccess when getItemLists has been done', (done)=>{
    var response = {itemLists:[], items: []}
    nock("http://localhost:3000")
      .get('/api/boards/1/itemLists')
      .reply(400, response)

    const expectedActions = [
      { type: actions.GET_ITEMLISTS_FAILURE, error: actions.GET_ITEMLISTS_ERROR }
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.getItemLists(1,"token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done)
  })

  it('creates deleteItemListsSuccess when deleteItemLists has been done', (done)=>{
    var response = {}
    var itemListId = 1
    var boardId = 1
    nock("http://localhost:3000")
      .delete('/api/boards/1/itemLists/1')
      .reply(200, response)

    const expectedActions = [
      { type: actions.DELETE_ITEMLIST_SUCCESS, itemListId }
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.deleteItemList(itemListId, boardId, "token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done)
  })

  it('creates deleteItemListsSuccess when deleteItemLists has failed', (done)=>{
    var response = {}
    var itemListId = 1
    var boardId = 1
    nock("http://localhost:3000")
      .delete('/api/boards/1/itemLists/1')
      .reply(400, response)

    const expectedActions = [
      { type: actions.DELETE_ITEMLIST_FAILURE, error: actions.DELETE_ITEMLIST_ERROR }
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.deleteItemList(itemListId, boardId, "token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done)
  })

  it('creates createItemListsSuccess when createItemLists has been done', (done)=>{
    var itemListInfo = {items: []}
    var boardId = 1
    nock("http://localhost:3000")
      .post('/api/boards/1/itemLists')
      .reply(200, {})

    const expectedActions = [
      { type: actions.CREATE_ITEMLIST_SUCCESS, itemListInfo }
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.createItemList({}, boardId, "token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done)
  })

  it('creates createItemListFailure when createItemLists has failed', (done)=>{
    var response = {}
    var boardId = 1
    nock("http://localhost:3000")
      .post('/api/boards/1/itemLists')
      .reply(400, response)

    const expectedActions = [
      { type: actions.CREATE_ITEMLIST_FAILURE, error: actions.CREATE_ITEMLIST_ERROR }
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.createItemList({}, boardId, "token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done)
  })

})
