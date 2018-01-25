import ApiClient from '../../api/client'
import { loading, showError } from '../loading'
import { push } from 'react-router-redux'

export const NEW_CLASS = 'NEW_CLASS'
export const NEW_STUDENT = 'NEW_STUDENT'


const api = new ApiClient()

export const newClass = (schoolClass) => {
  return dispatch => {
    dispatch(loading(true))

    if(!api.isAuthenticated()){
      dispatch(loading())
      dispatch(showError("You don't have authorization"))
      dispatch(push('/sign-in'))
      return
    }

    api.post("classes", schoolClass)
      .then((res) => {
        dispatch({ type: NEW_CLASS, payload: res.body })
        dispatch(loading())
        dispatch(push('/'))
      })
      .catch((error) => {
        dispatch(loading())
        dispatch(showError(error))
      })
  }
}

export const newStudent = (classId, newStudent) => {
  return dispatch => {
    dispatch(loading(true))

    if(!api.isAuthenticated()){
      dispatch(loading())
      dispatch(showError("You don't have authorization"))
      dispatch(push('/sign-in'))
      return
    }

    api.patch(`classes/${classId}/students`, newStudent)
      .then((res) => {
        dispatch({ type: NEW_STUDENT, payload: res.body })
        dispatch(loading())
        dispatch(push(`/classes/${classId}`))
      })
      .catch((error) => {
        dispatch(loading())
        dispatch(showError(error))
      })
  }
}

export default newClass
