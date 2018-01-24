import ApiClient from '../../api/client'
import { loading, showError } from '../loading'
import { push } from 'react-router-redux'

export const NEW_CLASS = 'NEW_CLASS'


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
        dispatch(loading())
        dispatch({ type: NEW_CLASS, payload: res.body })
      })
      .catch((error) => {
        dispatch(loading())
        dispatch(showError(error))
      })
  }
}

export default newClass
