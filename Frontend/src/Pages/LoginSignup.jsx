import React from 'react'
import "../Css/LoginSignup.css"
const LoginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>Sign up</h1>

        <div className="loginsignup-fields">
          <input type="text" placeholder='Enter Your Name'/>
          <input type="email" placeholder='Enter Your Email'/>
          <input type="password" placeholder='Enter Your password'/>
        </div>
        <button>continue</button>
        <p className="loginsignup-login">already have an account ? <span>Login here</span></p>
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, fugit!</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
