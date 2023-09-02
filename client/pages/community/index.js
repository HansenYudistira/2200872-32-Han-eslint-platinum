import React from 'react'

// import component
import Table from '../../components/Community/Table'
import CommingSoon from '../../components/CommingSoon'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'

// import css
import styles from '../../styles/LandingPage/community/community.module.css'

function community () {
  return (
        <div>
        <Navbar />
            <div className={styles.background}>

                <div>
                    <div style={{ display: 'flex' }}>
                        {/* <div> */}
                        <div className={styles['table-container']} style={{ flexGrow: 1, marginTop: '20px', marginBottom: '20px' }}>
                            <Table />
                        </div>
                        {/* <div> */}
                        <div className={styles['comming-soon-community']} style={{ flexGrow: 0 }}>
                            <CommingSoon />
                        </div>
                    </div>
                </div>

            </div>
            <Footer />

        </div>
  )
}

export default community
