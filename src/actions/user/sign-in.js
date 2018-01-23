import { push } from 'react-router-redux'
import ApiClient from '../../api/client'
import { loading, showError } from '../loading'

export const USER_SIGNED_IN = 'USER_SIGNED_IN'

const api = new ApiClient()


export default ({ email, password}) => {
  return dispatch => {
    dispatch(loading(true))

    api.authenticate(email, password)
      .then((res) => {
        dispatch(loading())
        const jwt = res.body.token
        api.storeToken(jwt)
        dispatch(push('/classes'))
        return api.get('/users/me')
      })
      .then((res) => {
        dispatch({ type: USER_SIGNED_IN, payload: res.body })
      })
      .catch((error) => {
        dispatch(loading())
        dispatch(showError(error))
      })
  }
}
