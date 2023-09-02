const stateAwal = {
  // state untuk game page
  round: 0,
  score: 0,

  // state untuk skeleton
  skeleton: true
}

export function reducer (
  state = stateAwal,
  action
) {
  switch (action.type) {
    case 'UPDATE_ROUND':
      return { ...state, round: action.payload }
    case 'UPDATE_SCORE':
      return { ...state, score: action.payload }

    case 'LOADING_SKELETON':
      return { ...state, skeleton: action.payload }

    default:
      return state
  }
}
