import './register.css'

import React from 'react'

function Register() {
  return (
    <div className='registerContainer'>
        <div className="logo"></div>
        <form>
            <input type="text"  placeholder='username'/><input type="email" placeholder='email' /><input type="password" placeholder='password' />
            <button>Register</button>
        </form>
    </div>
  )
}

export default Register