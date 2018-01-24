import ApiClient from '../../api/client'
import { loading, showError } from '../loading'
import { push } from 'react-router-redux'

export const FETCH_CLASSES = 'FETCH_CLASSES'
export const FETCH_ONE_CLASS = 'FETCH_ONE_CLASS'

const api = new ApiClient()

export const fetchClasses = () => {
  return dispatch => {
    dispatch(loading(true))

    if(!api.isAuthenticated()){
      dispatch(loading())
      dispatch(showError("You don't have authorization"))
      dispatch(push('/sign-in'))
      return
    }

    api.get("classes")
      .then((res) => {
        dispatch({ type: FETCH_CLASSES, payload: res.body })
        dispatch(loading())
      })
      .catch((error) => {
        dispatch(loading())
        dispatch(showError(error))
      })
  }
}

export const fetchOneClass = (classId) => {
  return dispatch => {
    dispatch(loading(true))

    if(!api.isAuthenticated()){
      dispatch(loading())
      dispatch(showError("You don't have authorization"))
      dispatch(push('/sign-in'))
      return
    }

    api.get(`classes/${classId}`)
      .then((res) => {
        dispatch({ type: FETCH_ONE_CLASS, payload: res.body })
        dispatch(loading())
      })
      .catch((error) => {
        dispatch(loading())
        dispatch(showError(error))
      })
  }
}

export default fetchClasses
