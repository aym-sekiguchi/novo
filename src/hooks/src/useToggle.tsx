'use client'

import { useReducer } from 'react'

// Type
type State = boolean

// Type
type Action = any // eslint-disable-line @typescript-eslint/no-explicit-any

/**
 * on/off を切り替えるためのフック
 *
 */
export function useToggle(initialState: boolean = false): readonly [State, (nextValue?: Action) => void] {
	const [state, dispatch] = useReducer(reducer, initialState)

	/* === return === */
	return [state, dispatch as (nextValue?: Action) => void] as const
}

// Reducer function
function reducer(state: State, action: Action): State {
	// action が boolean ならその値を返す

	/* === return === */
	return typeof action === 'boolean' ? action : !state
}
