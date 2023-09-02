/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Skeleton } from 'antd'

// import reactstrap
import { Button, FormGroup, Label, Input, FormText, Spinner } from 'reactstrap'

// import css
import style from '../../styles/profile/Profile.module.css'

// import components
import ModalProfile from '../../components/profilePage/Modal'
import NavbarProfile from '../../components/profilePage/Navbar'
import Footer from '../../components/Footer'

// api
import { userProfileApi } from '../../api/profilePageApi'
import { VideoApi } from '../../api/videoApi'

// import redux
import { useDispatch, useSelector } from 'react-redux'
import { loadingSkeleton } from '../../redux/action'

// use dummy data in case the server is error
const userDummy = {
  id: 0,
  username: 'User invalid',
  email: 'Email invalid',
  avatar: 'https://storage.googleapis.com/fsw32-platinum-team1.appspot.com/avatar/a58b131dc8e33b909ed5f5300?GoogleAccessId=firebase-adminsdk-sbc3l%40fsw32-platinum-team1.iam.gserviceaccount.com&Expires=1702339200&Signature=ee8zUytRhcTh4T%2BelaA6GyH8b88NSt3n2rqKnoEUv9Q5e%2BkbGbaYaZUAB9Y7Jav%2Fklbhk5qFcQDwh8%2B2etcPKgnto2JiseyKHbcZ2VNUjzSQqkDWRRri4F7fnl4P5WjwanhsgbBNoV3x%2FOThQ1fQ%2BEEhuLmcmYjo8OOQfcYbeLDZkvqyGc%2BC2M900tQSU1y3SNyqGncEIGY2qAqsvnaeD43ZhYPZJEDOLmbeEhXbz8Q0WDWGlscGMLZB9LZjygQRI0V2cikZV29l3DJ5Ali7UWUL68JE0ZJuk9awbw8b1uE%2F7%2BWCZJUeEMc1g4fiCmLUv42nWM5lNmY82aCYa0ew6Q%3D%3D',
  umur: 0,
  city: 'Data invalid',
  country: 'Data invalid'
}

function ProfilePage () {
  // state
  const [profileUser, setProfileUser] = useState({ data: userDummy })
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [videoUploaded, setVideoUploaded] = useState(false)

  // get original state of redux
  const reduxState = useSelector(state => state.reducer)
  const dispatch = useDispatch()

  // dari token, ambil id
  useEffect(() => {
    try {
      if (!localStorage.getItem('tokenId')) {
        window.location.replace('/login')
      } else {
        const id = Number(localStorage.getItem('tokenId'))
        userProfileApi(id).then((result) => {
          if (result !== undefined) {
            if (result.data.id === id) {
              setProfileUser({ data: result.data })
            }
          }
        })
          .finally(() => dispatch(loadingSkeleton(false)))
      }
    } catch (error) {
      console.error('Error occurred while verifying token:', error)
    }
  }, [])

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const handleUpload = () => {
    if (selectedFile) {
      const payload = {
        userId: profileUser.data.id,
        createVideo: selectedFile
      }
      setUploading(true)
      //   console.log('selectedFile:', selectedFile)
      // console.log(payload)

      //   console.log('formdata:', formdata)

      VideoApi(payload)
        .then(response => {
          console.log(response)
          setVideoUploaded(true)
        })
        .catch(error => {
          console.log('Error uploading video:', error)
        })
        .finally(() => {
          setUploading(false)
        })
    }
  }
  return (
        <div className={style.bgProfile}>
            <NavbarProfile />
                <div className={style.positionProfile}>
                    <div body outline color='primary'
                        className={style.profile}
                    >

                    {reduxState.skeleton ? (
                        // run skeleton while true
                        <div style={{
                          backgroundColor: 'lightGrey',
                          width: '15rem',
                          padding: '10px',
                          textAlign: 'center',
                          marginBottom: '30px'
                        }}>
                            <Skeleton.Avatar active shape="circle" size="large"/>
                            <div style={{
                              display: 'flex',
                              flexDirection: 'column',
                              paddingTop: '10px'
                            }}>
                                {[...Array(5)].map((_, index) => (
                                    <Skeleton active paragraph={false} />
                                ))}
                            </div>
                        </div>

                    ) : (

                        // Render actual data when skeleton stops
                        <>
                            <img
                                alt="avatar"
                                src={profileUser.data.avatar}
                                className={style.styleAvatar}
                            />
                            <div style={{
                              display: 'flex',
                              flexDirection: 'column'
                            }}>
                                <h3 className="text-center">
                                    {profileUser.data.username}
                                </h3>
                                <h5 className="text-secondary text-center">
                                    Email: {profileUser.data.email}
                                </h5>
                                <h5 className="text-secondary text-center">
                                    Umur: {profileUser.data.umur}
                                </h5>
                                <h5 className="text-secondary text-center">
                                    City: {profileUser.data.city}
                                </h5>
                                <h5
                                    className="text-secondary text-center"
                                    style={{ marginBottom: '100px' }}
                                >
                                    Country: {profileUser.data.country}
                                </h5>
                            </div>
                        </>
                    )}

                        <div className="d-flex">
                            <ModalProfile
                                profileUser={profileUser}
                            />
                            <Link href="/profile/history-game">
                                <Button style={{ backgroundColor: '#4E67EB' }}
                                    className={`ms-3 ${style.btnProfile}`}
                                >
                                    History Game
                                </Button>
                            </Link>
                        </div>
                        <div style={{ backgroundColor: '#291D89', borderRadius: '25px', marginBottom: '3rem' }}>

                        <FormGroup style={{ marginBottom: '5px' }}>
                            <div>
                        <h5 style={{ color: 'white' }}>Share Your Best Moment</h5></div>
                            {/* <Label for="exampleFile">Video File</Label> */}
                            <div style={{ marginLeft: '50px' }}>
                            <Input type="file" accept="video/mp4 "name="video" id="videoFile" onChange={handleFileChange} /></div>
                        </FormGroup>
                        <Button
                            style={{ backgroundColor: '#4E67EB', marginBottom: '25px' }}
                            className={`ms-3 ${style.btnProfile}`}
                            onClick={handleUpload}
                            disabled={uploading || videoUploaded}
                        >
                             {uploading ? 'Uploading...' : 'Submit Video'}
                        </Button>
                        {videoUploaded && (
                            <div style={{ color: 'white' }}>Video has been successfully uploaded!</div>
                        )}
                        {/* {uploading && <Spinner animation="border" color="light" />} */}
                        </div>
                    </div>
                </div>
            <Footer />
        </div>
  )
}

export default ProfilePage
