import React, { Component } from 'react'
import UsernameForm from './components/UsernameForm'
import { METHODS } from 'http'

class App extends Component {
  contructor() {
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
  }
  onUsernameSubmitted(username) {
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
      .then(response => {
        console.log('success')
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    return <UsernameForm onSubmit={this.onUsernameSubmitted} />
  }
}

export default App
