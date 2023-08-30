import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
// import { VideoApi } from '../../../api/videoApi'

import styles from '../../../styles/LandingPage/community/modal.module.css'

function ModalProfile(props) {
    const { onClose, userData } = props;
    // const [video, setVideoUrl] = useState('');
    // const [video, setSelectedVideo] = useState(null);

    // useEffect(() => {
    //     // console.log('video url updated:', video);
    //     try {
    //         if (video) {
    //             const formData = new FormData();
    //             formData.append("video", video, `video-user${userData.id}`);
    //             // console.log('video:', video)                
    //             VideoApi(formData, userData.id)
    //             .then((result) => {
    //                 const videoUrlFromApi = result.video;
    //                 setVideoUrl(videoUrlFromApi);
    //                 // console.log('video url:', video)
    //                 console.log('video url updated:', videoUrlFromApi);
    //             })
    //             .catch(error => {
    //                 console.error('Error uploading video:', error);
    //             });
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [video, userData.id]);

    return (
        <Modal className={styles["community-modal"]} isOpen={true} fade={false} toggle={onClose}>
            <ModalHeader toggle={onClose}>User Profile</ModalHeader>
            <ModalBody>
                <div className='d-flex' style={{ gap: "20px" }}>
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
                        
                        <video className={styles['video-wrapper']} src={userData.video} alt={userData.id} width={300} controls></video>
                        
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
}

export default ModalProfile;
