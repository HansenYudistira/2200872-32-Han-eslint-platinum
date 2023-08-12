import React, {useState, useEffect} from "react";
import Link from "next/link";

// import reactstrap
import { Button } from "reactstrap";

// import css
import style from "../../styles/profile/Profile.module.css"

// import components
import ModalProfile from "../../components/profilePage/Modal";
import NavbarProfile from "../../components/profilePage/Navbar";
import Footer from "../../components/profilePage/Footer";

// api
import { userProfileApi } from "../../api/profilePageApi";

// use dummy data in case the server is error
const userDummy = [{ 
    id: 0,
    username: "",
    email: "",
    avatar: 'https://storage.googleapis.com/fsw32-platinum-team1.appspot.com/avatar/a58b131dc8e33b909ed5f5300?GoogleAccessId=firebase-adminsdk-sbc3l%40fsw32-platinum-team1.iam.gserviceaccount.com&Expires=1702339200&Signature=ee8zUytRhcTh4T%2BelaA6GyH8b88NSt3n2rqKnoEUv9Q5e%2BkbGbaYaZUAB9Y7Jav%2Fklbhk5qFcQDwh8%2B2etcPKgnto2JiseyKHbcZ2VNUjzSQqkDWRRri4F7fnl4P5WjwanhsgbBNoV3x%2FOThQ1fQ%2BEEhuLmcmYjo8OOQfcYbeLDZkvqyGc%2BC2M900tQSU1y3SNyqGncEIGY2qAqsvnaeD43ZhYPZJEDOLmbeEhXbz8Q0WDWGlscGMLZB9LZjygQRI0V2cikZV29l3DJ5Ali7UWUL68JE0ZJuk9awbw8b1uE%2F7%2BWCZJUeEMc1g4fiCmLUv42nWM5lNmY82aCYa0ew6Q%3D%3D',
    umur: 0,
    city: "",
    country: ""

}]

function ProfilePage() {
     // state
     const [profileUser, setProfileUser] = useState({ data: userDummy });

     // dari token, ambil id
     useEffect(() => {
         try{
             if (!localStorage.getItem('tokenId')) {
                 window.location.replace('/login')
             } else {
                 const id = localStorage.getItem('tokenId')
                 userProfileApi(id).then( async (result) => {
                     if (result !== undefined) {
                         await setProfileUser({ data: result.data })
                     } 
                 })
             }
         } catch(error) {
             console.error('Error occurred while verifying token:', error);
         }
     }, [])
    
    return (
        <div className={style.bgProfile}>
            <NavbarProfile />
                <div className={style.positionProfile}>
                    <div  body outline color='primary'
                        className={style.profile}
                    >
                        <img 
                            alt="avatar" 
                            src={profileUser.data.avatar} 
                            className={style.styleAvatar} 
                        />  
                        <div style={{
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <h5 className="text-center">
                                {profileUser.data.username}
                            </h5>
                            <h6
                                className="text-secondary text-center"
                                style={{ marginBottom: "100px" }}
                            >
                                {profileUser.data.email}
                            </h6>
                            <div className="d-flex">
                                <ModalProfile 
                                    profileUser={profileUser}
                                />
                                <Link href="/profile/history-game">
                                    <Button style={{backgroundColor:"#4E67EB"}} 
                                        className={`ms-3 ${style.btnProfile}`}
                                    >
                                        History Game
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer />
        </div>
    )
}

export default ProfilePage;