import ApiClient from '../../api/client'
import { loading, showError } from '../loading'
import { push } from 'react-router-redux'

export const DESTROY_STUDENT = 'DESTROY_STUDENT'


const api = new ApiClient()

export const destroyStudent = (classId, studentId ) => {
  return dispatch => {
    dispatch(loading(true))

    if(!api.isAuthenticated()){
      dispatch(loading())
      dispatch(showError("You don't have authorization"))
      dispatch(push('/sign-in'))
      return
    }

    api.patch(`classes/${classId}/students/${studentId}`)
      .then((res) => {
        dispatch({ type: DESTROY_STUDENT, payload: res.body })
        dispatch(loading())
        dispatch(push(`/classes/${classId}`))
      })
      .catch((error) => {
        dispatch(loading())
        dispatch(showError(error))
      })
  }
}

export default destroyStudent
