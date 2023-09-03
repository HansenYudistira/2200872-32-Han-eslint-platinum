import React, { useState, useEffect, useRef } from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import { useRouter } from 'next/router'

// import api
import { InsertScoreApi } from '../../../api/gameScoreApi'
import { getAudioApi, UploadAudioApi } from '../../../api/audioApi'

// import css
import styles from '../../../styles/games/Rps.module.css'

import { useSelector, useDispatch } from 'react-redux'

import { updateRound, updateScore } from '../../../redux/action'

function RockPaperScissorsPage() {
  const router = useRouter()
  const game_url = router.pathname
  const reduxState = useSelector(state => state)
  const dispatch = useDispatch()
  const choices = ['rock', 'paper', 'scissors']
  const [username, setUsername] = useState(null)
  const [userChoice, setUserChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState('VS')
  const [insertMessage, setInsertMessage] = useState('')
  const [loading, setLoading] = useState(true)

  const [isPlaying, setIsPlaying] = useState(false)
  const [audioFile, setAudioFile] = useState(null)
  const audioRef = useRef(null)
  const [refreshAudio, setRefreshAudio] = useState('')

  const togglePlayPause = function () {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleFileChange = (event) => {
    setAudioFile(event.target.files[0])
  }

  const handleAudioUpload = () => {
    if (audioFile) {
      const user_id = localStorage.getItem("tokenId")
      const payload = {
        userId: user_id,
        createAudio: audioFile
      }

      UploadAudioApi(payload)
        .catch(error => {
          console.log('Error uploading audio:', error)
        })

      setRefreshAudio("Refresh page to apply changes !")
    }
  }

  const handleButtonDone = async () => {
    try {
      const user_id = localStorage.getItem("tokenId")

      // start the spinner
      setLoading(false)

      // send the data to BE
      await InsertScoreApi(user_id, game_url, reduxState.reducer.round, reduxState.reducer.score)
      await setInsertMessage(`Skor tersimpan di user ${username} dengan skor ${reduxState.reducer.score} dengan jumlah ronde ${reduxState.reducer.round}`)

      // reset states
      setTimeout(() => {
        dispatch(updateRound(0))
        dispatch(updateScore(0))
        setUserChoice(null)
        setComputerChoice(null)
        setResult('VS')
        setInsertMessage('')
        setLoading(true)
      }, 1000)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleButtonClick = (chosenChoice) => {
    if (result === 'VS') {
      // Generate computer's choice
      const randomIndex = Math.floor(Math.random() * choices.length)
      const randomChoice = choices[randomIndex]
      // Set user and computer choices
      console.log(reduxState.reducer)
      dispatch(updateRound(reduxState.reducer.round + 1))
      setUserChoice(chosenChoice)
      setComputerChoice(randomChoice)
    } else {
      setResult('Click Refresh !')
    }
  }

  const handleRestart = () => {
    // Reset the choices and result
    setUserChoice(null)
    setComputerChoice(null)
    setResult('VS')
  }

  useEffect(() => {
    if (userChoice && computerChoice) {
      // Evaluate the result
      if (userChoice === computerChoice) {
        setResult("It's a draw!")
      } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
      ) {
        setResult('You win!')
        dispatch(updateScore(reduxState.reducer.score + 1))
      } else {
        setResult('Com wins!')
      }
    }
  }, [userChoice, computerChoice])

  useEffect(() => {
    try {
      if (!localStorage.getItem('tokenId')) {
        window.location.replace('/login')
      } else {
        const userName = localStorage.getItem('tokenUsername')
        setUsername(userName)
      }
    } catch (error) {
      console.error('Error occurred while verifying token:', error)
    }
  }, [])

  useEffect(async function () {
    const user_id = localStorage.getItem("tokenId")
    const audioUrl = await getAudioApi(user_id)
    console.log('audio URL nya', JSON.stringify(audioUrl));
    // Initialize the audio element
    audioRef.current = new Audio()
    if (audioRef.current) {
      if(audioUrl.audioURL.audio === undefined) {
        audioRef.current.src = audioUrl.audioURL
      } else {
        audioRef.current.src = audioUrl.audioURL.audio
      }
      audioRef.current.muted = false
      audioRef.current.loop = true
    }
  }, []);

  return (
    <div className={styles.rpsBody}>
      <header className={styles.rpsHeader}>
        <div className={styles.rpsLeftitem}>
          <a href="/" type="button" className={styles.backButton} >
            <svg width="36" height="38" viewBox="0 0 36 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M35.0039 37.8633L0.09375 22.4648V17.4375L35.0039 0V8.4375L10.957 19.582L35.0039 29.4609V37.8633Z" fill="#724C21" />
            </svg>
          </a>
          <img src="/images/game/RpsGame/rps.png" alt="" className={styles.logo} />
          <h1 className={styles.rpsJudul}>ROCK PAPER SCISSORS</h1>
        </div>
        <div className={styles.rpsRightitem}>
          <div className={styles.audioPlayer}>
            <audio ref={audioRef} />
            <button className={styles.customPlayButton} onClick={togglePlayPause}>
              {isPlaying ? (
                <img src="/images/audio/volume-on-indicator.png" alt="Pause" className={styles.customPlayImg}/>
              ) : (
                <img src="/images/audio/volume-off-indicator.png" alt="Play" className={styles.customPlayImg}/>
              )}
            </button>
            <p>click to play/pause audio</p>
            <input type="file" accept="audio/*" onChange={handleFileChange} />
            <button onClick={handleAudioUpload}>Upload Audio</button>
            <p>{refreshAudio}</p>
          </div>
          <button onClick={() => handleButtonDone()} className={styles.doneButton}>
            {loading === true
              ? <span style={{ fontSize: '20px' }}>Save your Progress!</span>
              : <Spin indicator={<LoadingOutlined
                style={{
                  fontSize: 44,
                  color: 'white'
                }}
                spin
              />} />}
          </button>
        </div>

      </header>
      <div className={styles.rpsRondeDisplay}>
        Ronde : {reduxState.reducer.round}
      </div>
      <div className={styles.rpsScoreDisplay}>
        Score : {reduxState.reducer.score}
      </div>
      <br />
      <div className={styles.grid}>
        <div className={styles.row}>
          <div className={styles.col}>
            <h2 className={styles.rpsName} >{username}</h2>
          </div>
          <div className={`col ${styles.rpsResultMessage}`}>
            {insertMessage}
          </div>
          <div className={styles.col}>
            <h2 className={styles.rpsName}>COM</h2>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <button onClick={() => handleButtonClick('rock')} className={`${styles.rpsButton} ${userChoice === 'rock' ? styles.chosen : ''}`}>
              <img src="/images/game/RpsGame/batu.png" alt="" className={styles.batu} />
            </button>
          </div>
          <div className={styles.col}></div>
          <div className={styles.col}>
            <div className={`${styles.computerChoice} ${computerChoice === 'rock' ? styles.chosen : ''}`}>
              <img src="/images/game/RpsGame/batu.png" alt="" className={styles.batuCom} />
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <button onClick={() => handleButtonClick('paper')} className={`${styles.rpsButton} ${userChoice === 'paper' ? styles.chosen : ''}`}>
              <img src="/images/game/RpsGame/kertas.png" alt="" className={styles.kertas} />
            </button>
          </div>
          <div className={styles.result}>
            <span>{result}</span>
          </div>
          <div className={styles.col}>
            <div className={`${styles.computerChoice} ${computerChoice === 'paper' ? styles.chosen : ''}`}>
              <img src="/images/game/RpsGame/kertas.png" alt="" className={styles.kertasCom} />
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <button onClick={() => handleButtonClick('scissors')} className={`${styles.rpsButton} ${userChoice === 'scissors' ? styles.chosen : ''}`}>
              <img src="/images/game/RpsGame/gunting.png" alt="" className={styles.gunting} />
            </button>
          </div>
          <div className={styles.col}></div>
          <div className={styles.col}>
            <div className={`${styles.computerChoice} ${computerChoice === 'scissors' ? styles.chosen : ''}`}>
              <img src="/images/game/RpsGame/gunting.png" alt="" className={styles.guntingCom} />
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.rpsRefreshButton}>
            <button onClick={handleRestart} className={styles.refreshButton}>
              <img src="/images/game/RpsGame/refresh.png" alt="" className={styles.refreshImg} />
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default RockPaperScissorsPage
