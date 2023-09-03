/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Skeleton } from 'antd'

// import reactstrap
import { Navbar } from 'reactstrap'

// import css
import style from '../../styles/profile/History.module.css'

// import components
import Footer from '../../components/Footer/FooterAbs'

// api
import { historyGameApi } from '../../api/profilePageApi'

import { IoMdArrowRoundBack } from 'react-icons/io'

// import redux
import { useDispatch, useSelector } from 'react-redux'
import { loadingSkeleton } from '../../redux/action'

const userDummy = [
  {
    id: 0,
    gameName: 'No game played yet',
    playtime: 'N/A',
    totalRonde: 0,
    userSkor: 0
  }
]

function HistoryGame () {
  // state
  const [historyGame, setHistoryGame] = useState({ data: userDummy })

  // get original state of redux
  const reduxState = useSelector(state => state.reducer)
  const dispatch = useDispatch()

  useEffect(() => {
    try {
      const id = localStorage.getItem('tokenId')
      historyGameApi(id).then((result) => {
        if (result !== undefined) {
          if (result.data.length > 0) {
            setHistoryGame({ data: result.data })
          }
        }
      })
        .finally(() => dispatch(loadingSkeleton(false)))
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
        <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
            <Navbar
                style={{ backgroundColor: '#4E67EB' }}
                className="mx-4"
            >
                <div className="ms-3">
                    <Link href="/profile">
                        <IoMdArrowRoundBack size={30} color="white"/>
                    </Link>
                </div>
            </Navbar>
            <div style={{ marginTop: '60px' }} className="d-flex mx-5">
            <div className={style.tableContainer}
                style={{
                  backgroundColor: '#4E67EB',
                  width: '800px',
                  height: '75vh',
                  overflowY: 'scroll'
                }}>
                <div className={style.tableTitle}>
                    <h1>HISTORY GAME</h1>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Game Name</th>
                            <th>Play Time</th>
                            <th>Total Round</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reduxState.skeleton ? (

                            // run skeleton while true
                            <>
                            {[...Array(3)].map((_, index) => (
                            <tr key={index}>
                                <td>
                                <Skeleton active paragraph={false}/>
                                </td>
                                <td>
                                <Skeleton active paragraph={false}/>
                                </td>
                                <td>
                                <Skeleton active paragraph={false}/>
                                </td>
                                <td>
                                <Skeleton active paragraph={false}/>
                                </td>
                            </tr>
                            ))}
                            </>

                        ) : (

                        // Render actual data
                          historyGame.data.map((data) => {
                            return (
                                    <tr
                                        key={data.id}
                                    >
                                        <td>{data.gameName}</td>
                                        <td>{data.playtime}</td>
                                        <td>{data.totalRonde}</td>
                                        <td>{data.userSkor}</td>
                                    </tr>
                            )
                          })
                        )}
                    </tbody>
                </table>
            </div>
            </div>
            <Footer />
        </div>
  )
}

export default HistoryGame
