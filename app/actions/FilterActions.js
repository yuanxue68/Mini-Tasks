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

export const CHANGE_DATE_FILTER = 'CHANGE_DATE_FILTER'
export function changeDateFilter(date){
  return {
    type: CHANGE_DATE_FILTER,
    date
  }
}
