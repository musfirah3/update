import React, { useContext, useState } from 'react'
import Admin from './Admin'
import Guest from './Guest'
import Users from './Users'
import { GlobalContext } from '../src/Context/context'
import { decodeToken } from 'react-jwt'

// export const AppRoute= "/"
const ComponentByRole = {
  'admin': Admin,
  'guest': Guest,
  'user': Users
}
const getUserRole = (params) => ComponentByRole[params] || ComponentByRole['guest']


function App() {
  const {  state,dispatch } = useContext(GlobalContext)
  const getDecodeToken = (token) => {
    if (!token) {
      return undefined
    }
    else {
      const res = decodeToken(token)
      return res?.role
    }
  }
  const currentToken = getDecodeToken(state.token)
  const CurrentUser = getUserRole(currentToken)
  return <CurrentUser />
}

export default App