/* eslint-disable react/prop-types */
import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
// import { VideoApi } from '../../../api/videoApi'

import styles from '../../../styles/LandingPage/community/modal.module.css'

function ModalProfile (props) {
  const { onClose, userData } = props

  return (
        <Modal className={styles['community-modal']} isOpen={true} fade={false} toggle={onClose}>
            <ModalHeader toggle={onClose}>User Profile</ModalHeader>
            <ModalBody>
                <div className='d-flex' style={{ gap: '20px' }}>
                    <div>
                        <img src={userData.avatar} alt={userData.id} width={150}></img>
                    </div>
                    <div>
                        <h5>Username: {userData.username}</h5>
                        <h5>Email: {userData.email}</h5>
                        <h5>Age: {userData.age}</h5>
                        <h5>City: {userData.city}</h5>
                        <h5>Country: {userData.country}</h5>
                        <h5>Score: {userData.score}</h5>
                        <h5>Rank: {userData.rank}</h5>

                        <div className={styles['video-wrapper']}>{userData.video
                          ? (<video src={userData.video} alt={userData.id} width={300} controls></video>
                            )
                          : (
                            <p>Sobat ini belum punya moment video untuk dibagikan</p>
                            )}
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
  )
}

export default ModalProfile
