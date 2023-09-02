/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { FaGithub } from 'react-icons/fa'

// import component
import Footer from '../../components/Footer/FooterAbs'
import Navbar from '../../components/Navbar'

// import style
import style from '../../styles/LandingPage/aboutus/aboutus.module.css'

function aboutUs () {
  return (
        <div>
             <Navbar />
        <div className={style.background}>

             <div className={style.container}>

             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', minHeight: '100vh' }}>
  <div style={{ marginLeft: '20px', marginRight: '50px', marginTop: '30px' }}>
    <div className={style['about-title']} style={{
      backgroundColor: '#4E67EB',
      padding: '20px',
      borderRadius: '25px',
      width: '1000px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: '20px'
    }}>
              <h1>ABOUT US</h1>
              <div className='about-text' style={{ backgroundColor: '#4E67EB' }}>
                  <p>
                    Welcome to our online game platform!</p>

                    <p>We strive to provide a fun and engaging experience for gamers of all ages and backgrounds. Our platform offers a wide variety of games to choose from, including classic favorites and new releases.</p>

                    <p>Our team is made up of passionate gamers and developers who work tirelessly to ensure that our platform is user-friendly, reliable, and secure. We are committed to providing the best possible gaming experience for our users, and we are constantly working to improve our platform and add new features.</p>

                    <p>Whether you're a casual gamer or a hardcore enthusiast, we have something for everyone. So come join us and start playing today!
                  </p>
                </div>
                </div>
                <div className={style['developer-title']} style={{ color: 'white', textAlign: 'center', marginTop: '5px' }}>
                <h1 className='text-light'>Developer Team:</h1>

                <div className={`${style.developerName} d-flex justify-content-center`}>
                <div className={`${style.developerInfo} d-flex`} style={{ gap: '40px' }}>
                    <div className={style['developer-info-itemstyle']}>
                    <h6 >
                        Hansen Yudhistira
                    </h6>
                    <div className="icon-text-container">
                        <FaGithub />
                        <span>HansenYudistira</span>
                    </div>
                    </div>
                    <div className={style['developer-info-itemstyle']}>
                    <h6 >
                        Ignatius Kurniawan
                    </h6>
                    <div className="icon-text-container">
                        <FaGithub />
                        <span>sekrupman</span>
                    </div>
                    </div>
                    <div className={style['developer-info-itemstyle']}>
                    <h6 >
                        Difa ‘ Hanan Harahap
                    </h6>
                    <div className="icon-text-container">
                        <FaGithub />
                        <span> difahanan</span>
                    </div>
                    </div>
                    <div className={style['developer-info-itemstyle']}>
                    <h6 >
                        Agnes Septilia
                    </h6>
                    <div className="icon-text-container">
                        <FaGithub />
                        <span> agnes-septilia</span>
                    </div>
                    </div>
                    <div className={style['developer-info-itemstyle']}>
                    <h6 >
                        Nour Afni Putri
                    </h6>
                    <div className="icon-text-container">
                        <FaGithub />
                        <span>Nourafniputri</span>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                </div>
             </div>
        </div>
        <Footer />
        </div>
        </div>
  )
}

export default aboutUs
