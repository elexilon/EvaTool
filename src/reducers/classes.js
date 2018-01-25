import { FETCH_CLASSES, FETCH_ONE_CLASS } from '../actions/schoolclass/fetch'
import { NEW_CLASS, NEW_STUDENT } from '../actions/schoolclass/create'
import { DESTROY_STUDENT } from '../actions/schoolclass/destroy'
import { UPDATE_STUDENT } from '../actions/schoolclass/update'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case FETCH_CLASSES :
      return [ ...payload ]

    case UPDATE_STUDENT :
    case DESTROY_STUDENT :
    case NEW_CLASS :
    case NEW_STUDENT :
    case FETCH_ONE_CLASS :
      const classIds = state.map(g => g._id)

      if (state.length === 0) {
        return [{ ...payload }]
      }
      if (classIds.indexOf(payload._id) < 0) {
        return [{ ...payload }].concat(state)
      }

      return state.map((schoolClass) => {
        if (schoolClass._id === payload._id) {

          return { ...payload }
        }
        return schoolClass
      })

    default :
      return state

  }
}
