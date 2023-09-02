import React from 'react'

// import css
import style from '../../styles/footer/FooterRlt.module.css'

function Footer () {
  return (
      <footer className={style.footer}>
        <div className="footer-image">
            <img
                src="/images/logo.jpeg"
                style={{ height: '40px', width: 'auto' }}
            />
        </div>
        <div>
          <p>© 2023 TEAM HIDAN All rights reserved.</p>
        </div>
      </footer>
  )
};

export default Footer
