/* eslint-disable no-return-assign */
import React, { useState, useEffect } from 'react'
import { Label, Input, Button } from 'reactstrap'

// import css
import style from '../../styles/profile/Avatar.module.css'

// import api
import { AvatarApi } from '../../api/avatarApi'

const avatar = 'https://storage.googleapis.com/fsw32-platinum-team1.appspot.com/avatar/a58b131dc8e33b909ed5f5300?GoogleAccessId=firebase-adminsdk-sbc3l%40fsw32-platinum-team1.iam.gserviceaccount.com&Expires=1702339200&Signature=ee8zUytRhcTh4T%2BelaA6GyH8b88NSt3n2rqKnoEUv9Q5e%2BkbGbaYaZUAB9Y7Jav%2Fklbhk5qFcQDwh8%2B2etcPKgnto2JiseyKHbcZ2VNUjzSQqkDWRRri4F7fnl4P5WjwanhsgbBNoV3x%2FOThQ1fQ%2BEEhuLmcmYjo8OOQfcYbeLDZkvqyGc%2BC2M900tQSU1y3SNyqGncEIGY2qAqsvnaeD43ZhYPZJEDOLmbeEhXbz8Q0WDWGlscGMLZB9LZjygQRI0V2cikZV29l3DJ5Ali7UWUL68JE0ZJuk9awbw8b1uE%2F7%2BWCZJUeEMc1g4fiCmLUv42nWM5lNmY82aCYa0ew6Q%3D%3D'

function UploadAvatar () {
  const [userId, setUserId] = useState()
  const [imageUrl, setImageUrl] = useState(avatar)
  const [updateImage, setUpdateImage] = useState()

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      // simpan url file agar gambar yang ditampilkan berganti yang baru
      setImageUrl(URL.createObjectURL(event.target.files[0]))

      // simpan file type untuk dilempar ke BE
      setUpdateImage(event.target.files[0])
    }
  }

  const handleSubmit = (event) => {
    try {
      if (!updateImage) {
        alert('Please upload file!')
      } else {
        event.preventDefault()
        AvatarApi({ userId, updateImage }).then(async result => {
          // change avatar token with the new one
          await localStorage.removeItem('tokenAvatar')
          await localStorage.setItem('tokenAvatar', result.data.avatar)
          await window.location.replace('/profile')
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  // check if token is active
  useEffect(() => {
    try {
      if (!localStorage.getItem('tokenId')) {
        window.location.replace('/login')
      } else {
        setUserId(Number(localStorage.getItem('tokenId')))
        setImageUrl(localStorage.getItem('tokenAvatar'))
      }
    } catch (error) {
      console.error('Error occurred while verifying token:', error)
    }
  }, [])

  return (
        <div className={style.avatarBackground}>
            <div className={style.avatarFormArea}>
                <Label for="avatar" className="text-light mb-3">
                    <h1>Upload Avatar</h1>
                </Label>
                <img src={imageUrl} alt="" width={200} height={200} ></img >
                <Input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={onImageChange}
                />
                <div className={style.avatarButtonsArea}>
                    <Button
                        type="submit"
                        color="dark"
                        onClick={handleSubmit}>
                            Submit Avatar
                    </Button>{' '}

                    <Button
                        color="danger"
                        onClick={() => window.location.href = '/profile'}>
                            Cancel
                    </Button>
                </div>
            </div>

        </div>
  )
};

export default UploadAvatar
