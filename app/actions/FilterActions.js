export const ADD_COLOR_FILTER = 'ADD_COLOR_FILTER'
export function addColorFilter(color){
  return {
    type: ADD_COLOR_FILTER,
    color
  }
}

export const REMOVE_COLOR_FILTER = 'REMOVE_COLOR_FILTER'
export function removeColorFilter(color){
  return {
    type: REMOVE_COLOR_FILTER,
    color
  }
}

export const CHANGE_NAME_FILTER = 'CHANGE_NAME_FILTER'
export function changeNameFilter(name){
  return {
    type: CHANGE_NAME_FILTER,
    name
  }
}

export const CHANGE_DUE_BEFORE_FILTER = 'CHANGE_DUE_BEFORE_FILTER'
export function changeDueBeforeFilter(date){
  return {
    type: CHANGE_DUE_BEFORE_FILTER,
    date
  }
}

export const CHANGE_DUE_AFTER_FILTER = 'CHANGE_DUE_AFTER_FILTER'
export function changeDueAfterFilter(date){
  return {
    type: CHANGE_DUE_AFTER_FILTER,
    date
  }
}

export const CLEAR_FILTER = 'CLEAR_FILTER'
export function clearFilter(){
  return {
    type: CLEAR_FILTER
  }
}
