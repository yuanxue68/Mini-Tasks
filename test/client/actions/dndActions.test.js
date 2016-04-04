import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../../app/actions/DndActions'
import nock from 'nock'
import { expect } from 'chai'
import 'isomorphic-fetch' 

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('dnd actions', ()=>{
  afterEach(()=>{
    nock.cleanAll()
  })

  it('creates moveItemSuccess when moveItem has been done', (done)=>{
    var oldItemListId = 1
    var from = {_id:1, itemListId:1}
    var targetItemListId = 2
    var afterMove = {_id:1, itemListId: 2}
    nock("http://localhost:3000")
      .put('/api/items/1')
      .reply(200, {})

    const expectedActions = [
      { type: actions.MOVE_ITEM_SUCCESS, itemListInfo: afterMove , oldItemList: oldItemListId  }
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.moveItem(from, targetItemListId, "token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done)
  }) 

  it('creates moveItemFailure when moveItem has been done', (done)=>{
    var from = {_id:1, itemListId:1}
    var targetItemListId = 2
    nock("http://localhost:3000")
      .put('/api/items/1')
      .reply(400, {})

    const expectedActions = [
      { type: actions.MOVE_ITEM_FAILURE, error: actions.MOVE_ITEM_ERROR  }
    ]
    const store = mockStore({ boards:[] })

    store.dispatch(actions.moveItem(from, targetItemListId, "token"))
        .then(()=>{
          expect(store.getActions()).to.deep.equal(expectedActions)  
        })
        .then(done)
        .catch(done)
  }) 


})
