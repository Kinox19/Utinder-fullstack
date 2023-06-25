import React, { FC } from 'react'

const Auth:FC = () => {

    // const {login, register} = useActions();


  return (
    <div>Auth
        <form>
            <input type="email"></input>
            <input type="password"></input>
            <button type="submit">Регистрация</button>
        </form>
    </div>
  )
}

export default Auth