import React, { Component } from 'react'
import { SmartUserInfo } from './App'
import selectedUser from './App'

export class InfoUser extends Component {
  render() {
    return (
      <div>InfoUser
        <SmartUserInfo userId={selectedUser} />
      </div>
    )
  }
}

export default InfoUser