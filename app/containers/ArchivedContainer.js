import React, {Component} from 'react'
import {connect} from 'react-redux'
import {pushState} from 'redux-router'
import {getItemLists, editItemList, restoreItemList} from './../actions/ItemListActions'
import {getCookie} from './../utils/Utils'
import Archived from './../components/Archived'
import CircularProgress from 'material-ui/lib/circular-progress'

class ArchivedContainer extends Component {
  constructor(props){
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.onRestoreList = this.onRestoreList.bind(this)
  }

  nextPage(){
    const {dispatch, boardInfo, router, archivedItemLists} = this.props
    if(archivedItemLists.length === 0){
      return
    }
    const token = getCookie('yulloToken') 
    const nextPage = Number((router.location.query.page || 0)) + 1
    Promise.all([
      dispatch(pushState(null, `/board/${boardInfo._id}/archived?page=${nextPage}`, '')),
      dispatch(getItemLists(boardInfo._id, token, true, nextPage))
    ])
  }

  prevPage(){
    const {dispatch, boardInfo, router, archivedItemLists} = this.props
    if(!router.location.query.page || router.location.query.page <= 0){
      return
    }
    const token = getCookie('yulloToken')
    const prevPage = Number(router.location.query.page) - 1
    Promise.all([ 
      dispatch(pushState(null, `/board/${boardInfo._id}/archived?page=${prevPage}`, '')),
      dispatch(getItemLists(boardInfo._id, token, true, prevPage))
    ])

  }

  onRestoreList(itemListInfo){
    const {dispatch} = this.props
    const token = getCookie('yulloToken')
    itemListInfo.archived = false
    Promise.all([
      dispatch(editItemList(itemListInfo, token)),
      dispatch(restoreItemList(itemListInfo))
    ])
  }

  componentWillMount(){
    const {dispatch, boardInfo} = this.props
    const token = getCookie('yulloToken')
    if(!boardInfo._id)
      return
    dispatch(getItemLists(boardInfo._id, token, true, 0))
  }
  render(){
    const {loadingStatus} = this.props
    var content 
    if(!loadingStatus.loadingArchived){
      content = <Archived {...this.props}
        nextPage={this.nextPage}
        prevPage={this.prevPage}
        onRestoreList={this.onRestoreList}
      />
    } else {
      content = <div className="text-center">
        <CircularProgress/>
      </div>
    }

    return(
      <div>
        {content}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    boardInfo: state.boardInfo,
    router: state.router,
    archivedItemLists: state.archivedItemLists,
    loadingStatus: state.loadingStatus
  }
}

export default connect(mapStateToProps)(ArchivedContainer)
