import React, { useState, useEffect } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Label } from 'reactstrap'

// import api
import { TrendingGamesApi } from '../../api/landingGamesApi'
import { UserPlayedGames } from '../../api/userGamesApi'

// import styles
import styles from '../../styles/LandingPage/mainPage/mainpage.module.css'

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
  }
]

function CarouselComponent () {
  // get data of game
  const [carouselData, setCarouselData] = useState({ data: gameList })
  const [playedGames, setPlayedGames] = useState([])

  useEffect(() => {
    try {
      TrendingGamesApi().then((result) => {
        if (result !== undefined) {
          if (result.data.length > 0) {
            setCarouselData({ data: result.data })
          }
        }
      })

      const id = Number(localStorage.getItem('tokenId'))
      if (id) {
        UserPlayedGames(id).then((result) => {
          if (result !== undefined) {
            if (result.data.length > 0) {
              setPlayedGames(result.data)
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

  // function for carousel
  const renderSlides = carouselData.data.map((image) => (
  <div key={image.gameid} className="mb-5" style={{ width: '100%' }}>
    <div className="d-flex justify-content-evenly">
        <div>
            {playedGames.includes(image.gameid)
              ? <Label
                      style={{
                        position: 'absolute',
                        color: 'white',
                        fontSize: '36px',
                        backgroundColor: '#291D89',
                        width: '12rem',
                        height: '4rem',
                        borderBottomRightRadius: '25px',
                        textAlign: 'center',
                        zindex: '100'
                      }}>
                      PLAYED
                  </Label>
              : <div></div>
              }
            <img src={image.game_image_url} alt="" style={{ width: '500px', height: '230px' }}/>
        </div>
        <br />
        <div className="carousel-content d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-light">{image.game_name}</h1>
            <br></br>
            <h3 className="text-light">{image.game_description}</h3>
            <button
    className={styles['carousel-button']}
    style={{ backgroundColor: '#291D89', marginTop: '0.75rem' }}
    onClick={() => handleButtonClick(image.game_url)}
  >
    PLAY!
  </button>
        </div>
    </div>
  </div>
  ))

  const [currentIndex, setCurrentIndex] = useState()
  function handleChange (index) {
    setCurrentIndex(index)
  }
  return (
      <div className={styles['carousel-main']}>
        <Carousel
          showArrows={true}
          autoPlay={true}
          infiniteLoop={true}
          selectedItem={carouselData.data[currentIndex]}
          onChange={handleChange}
          className={styles['carousel-container']}
        >
          {renderSlides}
        </Carousel>
    </div>
  )
}

export default CarouselComponent
