import ApiClient from '../../api/client'
import { loading, showError } from '../loading'
import { push } from 'react-router-redux'

export const UPDATE_STUDENT = 'UPDATE_STUDENT'


const api = new ApiClient()

export const updateStudent = (classId, updatedStudent) => {
  return dispatch => {
    dispatch(loading(true))

    if(!api.isAuthenticated()){
      dispatch(loading())
      dispatch(showError("You don't have authorization"))
      dispatch(push('/sign-in'))
      return
    }

    api.patch(`classes/${classId}/students`, updatedStudent)
      .then((res) => {
        dispatch({ type: UPDATE_STUDENT, payload: res.body })
        dispatch(loading())
        dispatch(push('/'))
      })
      .catch((error) => {
        dispatch(loading())
        dispatch(showError(error))
      })
  }
}

export default updateStudent
