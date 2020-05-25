import React, { useContext } from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
    const history = useHistory()

    const auth = useContext(AuthContext)
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    return(
        <nav>
            <div class="nav-wrapper">
                <a href="/" class="brand-logo">Logo</a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li><NavLink to='/create'>Создать</NavLink></li>
                    <li><NavLink to='/links'>Links</NavLink></li>
                    <li><a to='/' onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>)
}