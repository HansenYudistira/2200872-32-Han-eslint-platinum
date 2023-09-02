import React, { useState, useEffect } from 'react'
import Link from 'next/link'

// import reactstrap
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Spinner,
  UncontrolledTooltip
} from 'reactstrap'

// import css
import style from '../../styles/profile/Profile.module.css'

import { TbCameraPlus } from 'react-icons/tb'

// import api
import { upsertProfileApi } from '../../api/profilePageApi'

function ModalProfile (profileUser) {
  const oldData = profileUser.profileUser.data

  // ===modal===
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  // state
  const [payload, setPayload] = useState({
    username: '',
    email: '',
    umur: '',
    city: '',
    country: ''
  })

  const [loading, setLoading] = useState(false)

  function handleChange (value) {
    setPayload({ ...payload, ...value })
    console.log('daya yg akan dikirim', payload)
  }

  const upsertData = async () => {
    console.log('id', oldData.id)
    return upsertProfileApi(oldData.id, payload)
  }

  async function handleRoll () {
    try {
      setLoading(true)
      const result = await upsertData()

      if (result !== undefined) {
        if (result.status === 'success') {
          await localStorage.removeItem('tokenUsername')
          await localStorage.setItem('tokenUsername', result.username)
          await window.location.replace('/profile')
        } else {
          alert(result.message)
          await window.location.replace('/profile')
        }
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  return (
        <div>
            <Button style={{ backgroundColor: '#4E67EB' }}
                className={`mb-3 ${style.btnProfile}`}
                onClick={toggle}
            >
                Edit Profile
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader
                    toggle={toggle}
                    className={style.styleModal}
                >
                    Edit Profile
                </ModalHeader>
                <ModalBody
                    className={style.styleModal}
                >
                    <div className="d-flex justify-content-center">
                        <img src={oldData.avatar} className={style.styleAvatar} />
                        <Link href="/profile/avatar" >
                            <p className={style.changeAvatar} id="logoCamera">
                                <TbCameraPlus size={26} style={{ cursor: 'pointer' }}/>
                            </p>
                        </Link>
                        <UncontrolledTooltip
                            placement="bottom"
                            target="logoCamera"
                            >
                            Change Avatar
                        </UncontrolledTooltip>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div>
                            <div className="mb-1">
                                <Label for='username'><b>Username</b></Label>
                                <Input
                                    type='text'
                                    name='username'
                                    id='username'
                                    className={style.myInput}
                                    placeholder={oldData.username}
                                    value={payload.username}
                                    onChange={ (event) => {
                                      handleChange({ username: event.target.value })
                                    }}
                                />
                            </div>
                            <div className="mb-1">
                                <Label for='email'><b>Email</b></Label>
                                <Input
                                    type='email'
                                    name='email'
                                    id='email'
                                    className={style.myInput}
                                    placeholder={oldData.email}
                                    value={payload.email}
                                    onChange={ (event) => {
                                      handleChange({ email: event.target.value })
                                    }}
                                />
                            </div>
                            <div className="mb-1">
                                <Label for='umur'><b>Umur</b></Label>
                                <Input
                                    type='number'
                                    name='umur'
                                    id='umur'
                                    className={style.myInput}
                                    placeholder={oldData.umur}
                                    value={payload.umur}
                                    onChange={ (event) => {
                                      handleChange({ umur: event.target.value })
                                    }}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mb-1">
                                <Label for='city'><b>City</b></Label>
                                <Input
                                    type='text'
                                    name='city'
                                    id='city'
                                    className={style.myInput}
                                    placeholder={oldData.city}
                                    value={payload.city}
                                    onChange={ (event) => {
                                      handleChange({ city: event.target.value })
                                    }}
                                />
                            </div>
                            <div className="mb-1">
                                <Label for='country'><b>Country</b></Label>
                                <Input
                                    type='text'
                                    name='country'
                                    id='country'
                                    className={style.myInput}
                                    placeholder={oldData.country}
                                    value={payload.country}
                                    onChange={ (event) => {
                                      handleChange({ country: event.target.value })
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className={style.styleModal}>
                <Button
                    style={{ backgroundColor: 'black' }}
                    onClick={handleRoll}
                    disabled={loading}
                >
                    { loading ? <Spinner> </Spinner> : 'Submit' }
                </Button>{' '}
                <Button className="ms-4" color="danger" onClick={toggle}>
                    Cancel
                </Button>
                </ModalFooter>
            </Modal>
        </div>
  )
}

export default ModalProfile
