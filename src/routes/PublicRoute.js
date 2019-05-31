import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Header from '../components/Header'

const PublicRoute = ({ isAuthenticated, ...rest }) => {
  if (isAuthenticated) return <Redirect to='/dashboard' />

  return (
    <div>
      <Header />
      <Route {...rest} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps)(PublicRoute)