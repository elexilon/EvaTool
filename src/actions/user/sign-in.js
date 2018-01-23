import { push } from 'react-router-redux'
import ApiClient from '../../api/client'
import { loading, showError } from '../loading'

export const USER_SIGNED_IN = 'USER_SIGNED_IN'

const api = new ApiClient()

export default (user) => {

  return dispatch => {
    const path = 'sessions'
    api.post(path, user)
      .then(res => {
        dispatch(loading(true))
        api.storeToken(res.body.token)
        dispatch(push('/'))
        dispatch(loading())
      })
      .catch(err => {
        dispatch(loading(true))
        dispatch(showError(err))
        dispatch(loading())
      })
  }
}

export const userSignedIn = () => {
  return dispatch => {
    const path = 'users/me'
      if (!api.isAuthenticated()) return

      api.get(path)
      .then(res => {
        dispatch(loading(true))
        dispatch({ type: USER_SIGNED_IN, payload: res.body })
        dispatch(loading())
      })
      .catch(err => {
        dispatch(loading(true))
        dispatch(showError(err))
        dispatch(loading())
      })
  }
}
