/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import { Label, Input, Button, Alert } from 'reactstrap'
import Link from 'next/link'

// SPINNER
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

// IMPORT CSS
import styles from '../../styles/RegisterLoginPage/Login.module.css'

// IMPORT API
import { LoginApi } from '../../api/loginApi'

const antIcon = (
    <LoadingOutlined
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 20,
      fontWeight: 70,
      color: 'blue'
    }}
    spin/>)

function LoginPage () {
  const [inputs, setInputs] = useState({})
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [showSpinner, setShowSpinner] = useState(false)

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      if (!inputs.username || !inputs.password) {
        setShowAlert(true)
        setAlertMessage('PLEASE ENTER YOUR USERNAME AND PASSWORD !')
        return
      }

      setShowSpinner(true)

      const result = await LoginApi(inputs)

      setShowSpinner(false)

      if (!result) {
        setAlertMessage('INTERNAL SERVER ERROR !!!')
        setShowAlert(true)
      } else {
        if (result.status === 'success') {
          localStorage.setItem('tokenId', result.data.id)
          localStorage.setItem('tokenUsername', result.data.username)
          localStorage.setItem('tokenAvatar', result.data.avatar)
          window.location.replace('/')// KALAU USER BERHASIL LOGIN LEMPAR KEHALAMAN ( HALAMAN MENYESUAIKAN )
        } else {
          setAlertMessage(result.message)
          setShowAlert(true)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
        <div
            className={
                `${styles.bodyClass}`
            }>
        <div
            className={
                `${styles.boxClass}`
            }>
        <div
            className={
                `${styles.borderClass}`
            }>
        </div>
        <div
            className={
                `${styles.formClass}`
            }>

        <Alert
            className={
                `${styles.alertClass}`
            }
            isOpen={showAlert}>
            {alertMessage}
        </Alert>

        <h2
            className={
                `${styles.hClass}`
            }>
            LOGIN ACCOUNT
        </h2>

        <div
            className={
                `${styles.inputBoxClass}`
            }>
        <Input
            type="text"
            name="username"
            id="username"
            className={
                `${styles.inputClass}`
            }
            value={inputs.username || ''}
            onChange={handleChange}
        required/>
        <Label
            for="username"
            className={
                `${styles.labelClass}`
            }>
            USERNAME
            </Label>
        <div
            className={
                `${styles.divClass}`
        }>
        </div>
        </div>

        <div
            className={
                `${styles.inputBoxClass}`
            }>
        <Input
            type="password"
            name="password"
            id="password"
            className={
                `${styles.inputClass}`
            }
            value={inputs.password || ''}
            onChange={handleChange}
        required/>
        <Label
            for="password"
            className={
                `${styles.labelClass}`
            }>
            PASSWORD
        </Label>
        <div
            className={
                `${styles.divClass}`
            }>
        </div>
        </div>

        <div
            className={
                `${styles.LinkClass}`
            }>
        <Link
             href="/reset-password">
                Forgot Password?
        </Link>
        <Link
             href="/register">
                Don't have account? register
        </Link>
        </div>

        {/* <div
            className={
                `${styles.ButtonContainerClass}`
            }>
        {/* <Button
            className={
                `${styles.ButtonClass}`
            }
            type="button"
            onclick="goToHomePage()"
            onClick={handleSubmit}
            href="/RegisterPage">
                BACK
        </Button>

        </div> */}
        <div
            className={
                `${styles.ButtonContainerClass}`
            }>
        <Button
            className={`${styles.SubmitClass}`}
            type="submit"
            onClick={handleSubmit}>
            {showSpinner ? <Spin indicator={antIcon} /> : 'LOGIN'}
        </Button>
        </div>

        </div>
        </div>
        </div>
  )
}

export default LoginPage
