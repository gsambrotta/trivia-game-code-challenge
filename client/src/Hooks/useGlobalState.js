/* 
  Very simple custom hook to manage state globally. 
  Implementation based on npm package: use-global-hook
  https://medium.com/javascript-in-plain-english/state-management-with-react-hooks-no-redux-or-context-api-8b3035ceecf8
*/

import { useState, useEffect } from 'react'

let listeners = []
let state = {
  totalScore: 0,
  results: [],
  scores: [],
}

const setState = (newState) => {
  // add state to each useState listener
  state = { ...state, ...newState }
  listeners.forEach((listener) => {
    listener(state)
  })
}

const useGlobalState = () => {
  const newListener = useState()[1]
  useEffect(() => {
    // create a new state/listener
    listeners.push(newListener)
    return () => {
      // clean up before the component unmount
      listeners = listeners.filter((listener) => listener !== newListener)
    }
  }, [])
  return [state, setState]
}

export default useGlobalState
