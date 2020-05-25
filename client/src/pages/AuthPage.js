import React, {useEffect, useState, useContext} from 'react'

import {useHttp} from '../hooks/useHttpHook.js'
import {useMessage} from '../hooks/messageHook.js'
import { Form, Button, Badge } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext.js'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
        
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
        
    }
    return (
    <div className='container'>
        <Form>
            <h1><Badge variant="secondary"> Авторизация </Badge></h1>
            <Form.Group>
                <Form.Label> Email </Form.Label>
                <Form.Control type="email" name='email' id='email' placeholder="Введите email" onChange={changeHandler} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group>
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password" name='password' id='password' placeholder="Пароль" onChange={changeHandler} />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading} onClick={loginHandler}>
                Войти
            </Button>
            <Button variant="outline-secondary" style={{marginLeft: 20}} type="submit" onClick={registerHandler} disabled={loading}>
                Зарегестрироваться
            </Button>
        </Form>
    </div>
)}
