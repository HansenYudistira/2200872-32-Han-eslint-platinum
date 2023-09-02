/* eslint-disable no-return-assign */
/* eslint-disable import/no-duplicates */
import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
// import { FaSignOutAlt } from "react-icons/fa";
import {
  NavLink
} from 'reactstrap'

// import css
import styles from '../../styles/LandingPage/mainPage/mainpage.module.css'

function LogoutModal () {
  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)

  // deactive token upon logout
  async function handleSubmit () {
    await localStorage.removeItem('tokenId')
    await localStorage.removeItem('tokenUsername')
    await localStorage.removeItem('tokenAvatar')
    await window.location.replace('/')
  }

  return (
        <div>
            {/* <Button
                color="transparent"
                className="mx-3"
                id="logout-button"
                onClick={toggle}>
                <FaSignOutAlt size={30} color="white"/>
                <h6 className="text-light pt-2">LOGOUT</h6>
            </Button> */}
        <NavLink className="text-white" onClick={toggle} style={{ cursor: 'pointer' }}
            onMouseOver={(e) => e.target.style.cursor = 'pointer'}
            onMouseOut={(e) => e.target.style.cursor = 'auto'}>
            Logout
        </NavLink>

        <Modal isOpen={modal} toggle={toggle} style={{ backgroundColor: 'aliceblue' }}>
            <ModalHeader toggle={toggle}>Logout Confirmation</ModalHeader>
            <ModalBody>
                Are you sure to logout ?
            </ModalBody>
            <ModalFooter>
            <Button color="secondary" onClick={toggle}>
                Cancel
            </Button>{' '}
            <Button style={{ backgroundColor: '#291D89' }}
                onClick={async () => {
                  await toggle()
                  await handleSubmit()
                }}>
                Logout
            </Button>

            </ModalFooter>
        </Modal>
        </div>
  )
}

export default LogoutModal
