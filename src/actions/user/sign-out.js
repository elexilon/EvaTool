import { push } from 'react-router-redux'
import ApiClient from '../../api/client'
import { loading } from '../loading'

export const USER_SIGNED_OUT = 'USER_SIGNED_OUT'

const api = new ApiClient()

export const userSignedOut = () => {
  return dispatch => {

    dispatch(loading(true))
    api.removeToken()
    dispatch(loading())
    dispatch({type: USER_SIGNED_OUT})
    dispatch(push('/'))
  }
}


export default userSignedOut
