export const OPEN_POPOVER = 'OPEN_POPOVER'
export const CLOSE_POPOVER = 'CLOSE_POPOVER'

export function openPopover(name, anchor=null){
  const popover = {
    name,
    anchor  
  }
	return {
		type: OPEN_POPOVER,
		popover
	}
}

export function closePopover(name, anchor=null){
	const popover = {
    name,
    anchor
  }
  return {
		type: CLOSE_POPOVER,
		popover
	}
}


