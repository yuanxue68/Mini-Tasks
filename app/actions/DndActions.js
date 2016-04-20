import {getHost} from './../utils/Utils'

export const ItemTypes = {
  ITEM: 'item',
  ITEMLIST: 'itemList'
}

export const HOVER_ITEM = 'HOVER_ITEM'

export function hoverItem(draggedItem, draggedIndex, hoveredItem, hoveredIndex){
  return {
    type: HOVER_ITEM,
    draggedItem,
    draggedIndex,
    hoveredItem,
    hoveredIndex
  }
}

export const MOVE_ITEMLIST = 'MOVE_ITEMLIST'

export function moveItemList(draggedItemList, hoveredIndex){
  return {
    type: MOVE_ITEMLIST,
    draggedItemList,
    hoveredIndex
  }
}
