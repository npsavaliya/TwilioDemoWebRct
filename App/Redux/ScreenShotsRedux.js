import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'


/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  addScreenshot: ['screenshot'],
})

export const ScreenShotsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  screenshots: [],
})

/* ------------- Reducers ------------- */

export const addScreenshot = (state, { screenshot }) => {
  return state.merge({ screenshots: [...state.screenshots, screenshot] })
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADD_SCREENSHOT]: addScreenshot,
})
