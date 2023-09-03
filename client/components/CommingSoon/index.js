/* eslint-disable multiline-ternary */
/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Skeleton } from 'antd'

// import styles
import styles from '../../styles/LandingPage/commingsoon.module.css'

// import api
import { ComingSoonGamesApi } from '../../api/landingGamesApi'

// import redux
import { useDispatch, useSelector } from 'react-redux'
import { loadingSkeleton } from '../../redux/action'

// use dummy data in case the server is error
const gameList = [
  {
    gameid: -1,
    game_description: 'Experience the thrill of using your head to score and become the champion!',
    game_image_url: '/images/game/Gamelist/Headball.jpg'
  },
  {
    gameid: -2,
    game_description: "The World's #1 multiplayer pool game!",
    game_image_url: '/images/game/Gamelist/8BallPool.jpg'
  },
  {
    gameid: -3,
    game_description: 'Beat your opponents in this innovative 6-player real time golf game.',
    game_image_url: '/images/game/Gamelist/GolfBattle.jpg'
  }
]

function CommingSoon () {
  // get original state of redux
  const reduxState = useSelector(state => state.reducer)
  const dispatch = useDispatch()

  // get data of game
  const [comingsoonData, setCommingsoonData] = useState({ data: gameList })

  useEffect(() => {
    try {
      ComingSoonGamesApi().then((result) => {
        if (result !== undefined) {
          if (result.data.length > 0) {
            setCommingsoonData({ data: result.data })
          }
        }
      })
        .finally(() => dispatch(loadingSkeleton(false)))
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
      <div>
      <Card className={styles['comingsoon-card']}
        style={{
          width: '28rem',
          backgroundColor: '#4E67EB',
          borderRadius: '25px'
        }}>
      <Card.Title className={styles['card-title']} style={{ color: 'white' }}>Coming Soon</Card.Title>

        {reduxState.skeleton ? (

            // run skeleton while true
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ paddingRight: '20px' }}
              >
              {[...Array(3)].map((_, index) => (
                <Skeleton active paragraph={false} style={{ height: '150px' }}/>
              ))}
              </div>

        ) : (

        // Render actual data when skeleton stops
          comingsoonData.data.map((game) => (
            <div key={game.gameid}>
              <div>
                <Card.Img variant="top" src={game.game_image_url} alt="" style={{ width: '25rem', height: '10.5rem' }} />
                <Card.Text className={styles['card-text']}>
                  {game.game_description}
                </Card.Text>
              </div>
            </div>
          ))

        )}

      </Card>
    </div>
  )
}

export default CommingSoon
