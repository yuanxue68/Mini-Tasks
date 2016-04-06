export const TOGGLE_ASIDE = 'TOGGLE_ASIDE'

export function toggleAside(aside){
	return {
		type: TOGGLE_ASIDE,
		aside
	}
}

