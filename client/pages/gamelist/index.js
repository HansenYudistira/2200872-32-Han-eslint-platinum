/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardTitle, CardText, Button, Container, Label } from 'reactstrap'
import { Skeleton } from 'antd'

// import css
import styles from '../../styles/games/Gamelist.module.css'

// import api
import { gameListApi } from '../../api/gameListApi'
import { UserPlayedGames } from '../../api/userGamesApi'

// import component
import LeaderboardPopover from '../../components/Gamelist/Popover'

// import redux
import { useDispatch, useSelector } from 'react-redux'
import { loadingSkeleton } from '../../redux/action'

// use dummy data in case the server is error
const gameList = [
  {
    gameid: -1,
    game_name: 'Rock Paper Scissors',
    game_description: 'Traditional Games to play with your best friends',
    game_url: '/game/rps',
    game_image_url: '/images/game/Gamelist/RPS.jpg'
  },
  {
    gameid: -2,
    game_name: 'Caroom Pool',
    game_description: 'Carrom Pool is an easy-to-play multiplayer board game. Are you up for the challenge?',
    game_url: '/game/caroompool',
    game_image_url: '/images/game/Gamelist/CarromPool.jpg'
  },
  {
    gameid: -3,
    game_name: 'Soccer Stars',
    game_description: 'Easy to pick up and fun to play. Will you take the cup home?',
    game_url: '/game/soccerstars',
    game_image_url: '/images/game/Gamelist/SoccerStars.jpg'
  },
  {
    gameid: -4,
    game_name: 'Mini Football',
    game_description: 'Wild football fun at your fingertips!',
    game_url: '/game/minifootball',
    game_image_url: '/images/game/Gamelist/MiniFootball.jpg'
  },
  {
    gameid: -5,
    game_name: 'Sic Bo',
    game_description: 'Place your bet on Classic Chinese dice game!',
    game_url: '/game/sicbo',
    game_image_url: '/images/game/Gamelist/SicBo.jpg'
  },
  {
    gameid: -6,
    game_name: 'Mini Militia',
    game_description: 'Battle with up to 6 players online in this fun cartoon themed 2D game.',
    game_url: '/game/minimilitia',
    game_image_url: '/images/game/Gamelist/Minimilitia.jpg'
  }
]

function GameListPage () {
  // state
  const [gameslist, setGamelist] = useState({ data: gameList })
  const [username, setUsername] = useState(null)
  const [playedGames, setPlayedGames] = useState([])

  // get original state of redux
  const reduxState = useSelector(state => state.reducer)
  const dispatch = useDispatch()

  function hasPlayedGame (gameId, playedGames) {
    return playedGames.some(game => game === gameId)
  }

  function handleButtonClick (game_url) {
    try {
      // check if token exist
      if (username) {
        window.location.href = game_url
      } else {
        window.location.href = '/login'
      }
    } catch (error) {
      console.error('Error occurred while verifying token:', error)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await gameListApi()
        if (result !== undefined) {
          if (result.data.length > 0) {
            setGamelist({ data: result.data })
          }
        }
        await dispatch(loadingSkeleton(false))

        const id = Number(localStorage.getItem('tokenId'))
        if (id) {
          const gamePlayed = await UserPlayedGames(id)

          if (gamePlayed !== undefined) {
            if (gamePlayed.data.length > 0) {
              setPlayedGames(gamePlayed.data)
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData() // Call the fetchData function inside useEffect

    const userName = localStorage.getItem('tokenUsername')
    if (userName) { setUsername(userName) }
  }, [])

  return (
        <div className={styles.gamelistBody}>
            <Container className={styles.gamelistContainer}>
                {gameslist.data.map(function (data) {
                  const isPlayed = hasPlayedGame(data.gameid, playedGames)
                  return (
                        <Card className={styles.gamelistCardClass}>
                            {reduxState.skeleton ? (
                                // run skeleton while true
                                <div
                                    className="d-flex flex-column justify-content-cetner align-items-center"
                                    style={{
                                      gap: '10px',
                                      backgroundColor: 'lightGrey',
                                      textAlign: 'center',
                                      width: '100%',
                                      marginBottom: '20px'
                                    }}
                                    >
                                    <Skeleton.Avatar active shape="circle" size="large"/>
                                    {[...Array(5)].map((_, index) => (
                                        <Skeleton active paragraph={false}/>
                                    ))}
                                </div>

                            ) : (

                                // Render actual data when skeleton stops
                                <>
                                    <div className={styles.imageContainer}>
                                        <img alt="" className={styles.gamelistImg} src={data.game_image_url} />
                                        {isPlayed && <Label className={`${styles.playedLabel} text-success`}>Game Played</Label>}
                                    </div>
                                    <CardBody className={`${styles.gamelistCard} text-dark`}>

                                            <CardTitle className={`${styles.gamelistJudul} text-bold`}>
                                                {data.game_name}
                                            </CardTitle>
                                            <CardText className={`${styles.gamelistText} text-dark`}>
                                                {data.game_description}
                                            </CardText>
                                            <div className='d-flex justify-content-start'>
                                            <Button onClick={() => handleButtonClick(data.game_url)}>
                                                Play Now
                                            </Button>{' '}
                                            <LeaderboardPopover gameId = {data.gameid}/>
                                        </div>
                                    </CardBody>
                                </>
                            )}
                        </Card>
                  )
                })}
            </Container>
        </div>
  )
}

export default GameListPage
