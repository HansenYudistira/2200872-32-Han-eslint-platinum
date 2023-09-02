import React from 'react'
import Link from 'next/link'

// import reactstrap
import { Navbar, Container, UncontrolledTooltip } from 'reactstrap'

// import css
import style from '../../styles/profile/Profile.module.css'

// import component
import LogoutModal from './logoutModal'

function navbarProfile () {
  return (
        <div style={{ marginBottom: '50px' }}>
            <Navbar className={style.navbarProfile}>
                <Container>
                    <div style={{ marginLeft: '20px' }}>
                        <Link href="/">
                            <img
                                alt="logo"
                                src="/images/logo.jpeg"
                                id="logoToHome"
                                style={{ height: '40px', width: 'auto', cursor: 'pointer' }}
                            />
                        </Link>
                        <UncontrolledTooltip
                                placement="right"
                                target="logoToHome"
                                >
                                HOME
                        </UncontrolledTooltip>
                    </div>
                    <div style={{ color: 'white' }}>
                        <h3>P R O F I L E</h3>
                    </div>
                    <div>
                        <LogoutModal />
                    </div>
                </Container>
            </Navbar>
        </div>
  )
}

export default navbarProfile
