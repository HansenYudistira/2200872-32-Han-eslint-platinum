import React, { useState } from 'react'

// import reactstrap
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

// import icons
import { FaSignOutAlt } from 'react-icons/fa'

function LogoutModal () {
  // state
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
            <Button
                style={{ height: '60px' }}
                color="transparent"
                id="logout-button"
                onClick={toggle}
            >
                <FaSignOutAlt size={18} color="black"/>
                <p className="text-light">LOGOUT</p>
            </Button>

            <Modal isOpen={modal} toggle={toggle} style={{ backgroundColor: 'aliceblue' }}>
                <ModalHeader toggle={toggle}>
                    Logout Confirmation
                </ModalHeader>
                <ModalBody >
                    Are you sure to logout ?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={toggle}>
                        Cancel
                    </Button>{' '}
                    <Button style={{ backgroundColor: 'black' }}
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
