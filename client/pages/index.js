import React from 'react'

// import component
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import CarouselComponent from '../components/LandingPage/carrousel'
import PopularGames from '../components/LandingPage/popularGames'
import LeaderBoard from '../components/LandingPage/leaderboard'
import CommingSoon from '../components/CommingSoon'

// import styles
import styles from '../styles/LandingPage/mainPage/mainpage.module.css'

function Homepage () {
  return (
        <div>
            <div className={styles.background}>
            <Navbar />

            <div className={styles['landing-header']}>
                <CarouselComponent />
            </div>
            <div className="d-flex">
                <div className='d-flex flex-column'>
                    <div>
                        <PopularGames />
                    </div>
                    <div>
                        <LeaderBoard />
                    </div>
                </div>
                <div className={styles['comming-soon']}>
                    <CommingSoon />
                </div>
            </div>
            <Footer />
            </div>
        </div>
  )
}

export default Homepage
