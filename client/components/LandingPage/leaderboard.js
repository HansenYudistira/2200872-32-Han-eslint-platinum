/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap'
import { GiGoldBar } from 'react-icons/gi'
import { Skeleton } from 'antd'

// import api
import { LeaderboardAPI } from '../../api/communityApi'

// import styles
import styles from '../../styles/LandingPage/mainPage/mainpage.module.css'

// import redux
import { useDispatch, useSelector } from 'react-redux'
import { loadingSkeleton } from '../../redux/action'

// use dummy data in case the server is error
const leaderList = [
  {
    id: -1,
    username: 'Hansen',
    score: 270,
    rank: 'gold',
    avatar: 'https://source.unsplash.com/featured/100'
  },
  {
    id: -2,
    username: 'Ignatius',
    score: 245,
    rank: 'gold',
    avatar: 'https://source.unsplash.com/featured/101'
  },
  {
    id: -3,
    username: 'Difa',
    score: 150,
    rank: 'silver',
    avatar: 'https://source.unsplash.com/featured/102'

  },
  {
    id: -4,
    username: 'Agnes',
    score: 145,
    rank: 'silver',
    avatar: 'https://source.unsplash.com/featured/103'
  },
  {
    id: -5,
    username: 'Nour',
    score: 90,
    rank: 'bronze',
    avatar: 'https://source.unsplash.com/featured/104'
  }
]

function LeaderBoard () {
  // get original state of redux
  const reduxState = useSelector(state => state.reducer)
  const dispatch = useDispatch()

  // get data of leaderboard
  const [leaderboardData, setLeaderboardData] = useState({ data: leaderList })
  useEffect(() => {
    try {
      LeaderboardAPI().then((result) => {
        if (result !== undefined) {
          if (result.data.length > 0) {
            setLeaderboardData({ data: result.data })
          }
        }
      })
        .finally(() => dispatch(loadingSkeleton(false)))
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
        <div className={styles.leaderboard}>
            <div>
                <div className="mt-3 text-light d-flex justify-content-between">
                    <h2>LEADERBOARD</h2>
                    <a href="/community" className="text-light fst-italic text-decoration-underline"><h5>{'See all >>>'}</h5></a>
                </div>

                {reduxState.skeleton ? (
                    // run skeleton while true
                    <div
                        className="d-flex justify-content-between align-items-center"
                        style={{ paddingRight: '20px', gap: '10px' }}
                        >
                        {[...Array(5)].map((_, index) => (
                        <Skeleton active paragraph={false}
                            style={{
                              height: '16rem',
                              width: '11rem',
                              paddingTop: '7rem',
                              backgroundColor: '#4E67EB',
                              borderRadius: '25px'
                            }}/>
                        ))}
                    </div>

                ) : (

                    // Render actual data when skeleton stops
                    <div className="d-flex justify-content-between" style={{ gap: '1rem' }}>
                        {leaderboardData.data.map((leader) => (
                            <div key={leader.id}>
                                <Card
                                    outline
                                    style={{
                                      width: '11rem',
                                      height: '16rem',
                                      textAlign: 'center',
                                      backgroundColor: '#4E67EB',
                                      borderRadius: '25px'
                                    }}
                                    >
                                    <img
                                        className="p-1"
                                        style={{
                                          borderTopRightRadius: '25px',
                                          borderTopLeftRadius: '25px',
                                          textAlign: 'center',
                                          width: '11rem',
                                          height: '9rem',
                                          borderRadius: '25px'
                                        }}
                                        alt=""
                                        src={leader.avatar}
                                    />
                                    <CardBody>
                                        <CardTitle className="h5 mb-3 text-light">
                                            {leader.username}
                                        </CardTitle>

                                        <CardSubtitle className="h6 text-light">
                                            <div className="d-flex justify-content-around">
                                                {(() => {
                                                  switch (true) {
                                                    case leader.rank === 'gold' :
                                                      return (<GiGoldBar size={30} style={{ color: '#FFD700' }} />)
                                                    case leader.rank === 'silver' :
                                                      return (<GiGoldBar size={30} style={{ color: '#C0C0C0' }} />)
                                                    default:
                                                      return (<GiGoldBar size={30} style={{ color: '#B08D57' }} />)
                                                  }
                                                }
                                                )()}

                                                <div>{leader.score}</div>
                                            </div>
                                        </CardSubtitle>
                                    </CardBody>
                                </Card>
                            </div>
                        ))}
                    </div>

                )}
            </div>
        </div>
  )
}

export default LeaderBoard
