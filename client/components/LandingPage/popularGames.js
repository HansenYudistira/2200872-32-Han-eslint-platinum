/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardTitle, Label } from 'reactstrap'
import { Skeleton } from 'antd'

// import api
import { PopularGamesApi } from '../../api/landingGamesApi'
import { UserPlayedGames } from '../../api/userGamesApi'

// import styles
import styles from '../../styles/LandingPage/mainPage/mainpage.module.css'

// import redux
import { useDispatch, useSelector } from 'react-redux'
import { loadingSkeleton } from '../../redux/action'

// use dummy data in case the server is error
const gameList = [
  {
    gameid: -1,
    game_name: 'Sic Bo',
    game_url: '/game/sicbo',
    game_image_url: '/images/game/Gamelist/SicBo.jpg'
  },
  {
    gameid: -2,
    game_name: 'Basketball Stars',
    game_url: '/game/basketballstars',
    game_image_url: '/images/game/Gamelist/BasketballStars.jpg'
  },
  {
    gameid: -3,
    game_name: 'Mini Militia',
    game_url: '/game/minimilitia',
    game_image_url: '/images/game/Gamelist/Minimilitia.jpg'
  },
  {
    gameid: -4,
    game_name: 'Sniper Strike',
    game_url: '/game/sniperstrike',
    game_image_url: '/images/game/Gamelist/SniperStrike.jpg'
  },
  {
    gameid: -5,
    game_name: 'Ultimate Golf',
    game_url: '/game/ultimategolf',
    game_image_url: '/images/game/Gamelist/UltimateGolf.jpg'
  }
]

function PopularGames () {
  // get original state of redux
  const reduxState = useSelector(state => state.reducer)
  const dispatch = useDispatch()

  // get data of game
  const [popularData, setPopularData] = useState({ data: gameList })
  const [playedGames, setPlayedGames] = useState([])

  useEffect(() => {
    try {
      PopularGamesApi().then((result) => {
        if (result !== undefined) {
          if (result.data.length > 0) {
            setPopularData({ data: result.data })
          }
        }
      })
        .finally(() => dispatch(loadingSkeleton(false)))

      const id = Number(localStorage.getItem('tokenId'))
      if (id) {
        UserPlayedGames(id).then((gamePlayed) => {
          if (gamePlayed !== undefined) {
            if (gamePlayed.data.length > 0) {
              setPlayedGames(gamePlayed.data)
            }
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  function handleButtonClick (game_url) {
    try {
      // check if token exist
      if (localStorage.getItem('tokenUsername')) {
        window.location.href = game_url
      } else {
        window.location.href = '/login'
      }
    } catch (error) {
      console.error('Error occurred while verifying token:', error)
    }
  };

  return (
        <div className={styles['popular-game']}>
        <div className="mt-3 text-light d-flex justify-content-between">
            <h2>POPULAR GAMES</h2>
            <a href="/gamelist" className="text-light fst-italic text-decoration-underline"><h5>{'See all >>>'}</h5></a>
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
                {Array.isArray(popularData.data) &&
                    popularData.data.map((game) => (
                        <div key={game.gameid}>
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
                                    src={game.game_image_url}
                                />

                                {playedGames.includes(game.gameid)
                                  ? <Label
                                        style={{
                                          position: 'bottom',
                                          width: '9rem',
                                          paddingLeft: '1rem',
                                          marginLeft: '1rem',
                                          paddingRight: '1rem',
                                          backgroundColor: '#291D89',
                                          color: 'white',
                                          zindex: '100',
                                          borderRadius: '25px'
                                        }}>
                                        PLAYED
                                    </Label>
                                  : <div></div>
                                }

                                <CardBody>
                                    <CardTitle
                                        className="h6 text-light">
                                        {game.game_name}
                                    </CardTitle>
                                    <button
                                        className={`${styles['carousel-button']} ${styles['mt-3']} style`}
                                        style={{ backgroundColor: '#291D89' }}
                                        onClick={() => handleButtonClick(game.game_url)}
                                        >
                                        PLAY!
                                    </button>
                                </CardBody>
                            </Card>
                        </div>
                    ))}
            </div>
        )}
    </div>
  )
}

export default PopularGames
