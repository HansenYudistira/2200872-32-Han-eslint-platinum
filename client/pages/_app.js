/* eslint-disable react/prop-types */
import React from 'react'

import { useRouter } from 'next/router'

import store from '../redux/store'
import { Provider } from 'react-redux'

function MyApp ({ Component, pageProps }) {
  const router = useRouter()
  const pathname = router.pathname

  if (['/register', '/login', '/reset-password'].includes(pathname)) {
    // eslint-disable-next-line
    import ('../styles/globals.css')
  } else {
    import('bootstrap/dist/css/bootstrap.min.css')
    import('../styles/globals.css')
  }

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
