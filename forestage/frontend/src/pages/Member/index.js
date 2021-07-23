import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import Profile from '../../components/Member/Profile/'
import Reservation from '../../components/Member/Reservation/'

function Member(props) {
  const url = props.match.url

  return (
    <Switch>
      <Route path={`${url}/reservation`}>
        <Reservation />
      </Route>
      <Route path={`${url}/profile`}>
        <Profile pagename="會員資料" />
      </Route>
      <Route exact path={`${url}`}>
        <Profile pagename="會員資料" />
      </Route>
    </Switch>
  )
}

export default withRouter(Member)
