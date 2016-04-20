import {getHost} from './../utils/Utils'

export const ItemTypes = {
  ITEM: 'item',
  ITEMLIST: 'itemList'
}

export const MOVE_ITEM = 'MOVE_ITEM'

export function moveItem(item, newItemListId, newIndex){
  return {
    type: MOVE_ITEM,
    item,
    newItemListId,
    newIndex
  }
}

export const MOVE_ITEMLIST = 'MOVE_ITEMLIST'

export function moveItemList(itemList, newIndex){
  return {
    type: MOVE_ITEMLIST,
    itemList,
    newIndex
  }
}
