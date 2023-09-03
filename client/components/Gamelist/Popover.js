import React, { useState } from 'react'

// import reactstrap
import { Button, UncontrolledPopover, PopoverBody, Table } from 'reactstrap'

// import api
import { leaderboardGameApi } from '../../api/gameListApi'

// use dummy data in case the server is error
const leadergame = [
  {
    user_id: -1,
    username: 'No Player found',
    score: 0
  }
]

function LeaderboardPopover (gameId) {
  console.log('gameid', gameId.gameId)
  const [leaderboard, setLeaderboard] = useState({ data: leadergame })
  function getLeadearboardData () {
    try {
      leaderboardGameApi(Number(gameId.gameId)).then((result) => {
        if (result !== undefined) {
          if (result.data.length > 0) {
            setLeaderboard({ data: result.data })
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
        <div>
            <Button
                id={`popover${gameId.gameId}`}
                type="button"
                style={{ marginLeft: '20px' }}
                onClick={getLeadearboardData}>
                Top Players
            </Button>
            <UncontrolledPopover
                placement="right"
                target={`popover${gameId.gameId}`}
                trigger="focus"
                >
                <PopoverBody>
                    <Table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.data.map((user) => {
                              return (
                                <tr key={user.user_id}>
                                    <td>{user.username}</td>
                                    <td>{user.score}</td>
                                </tr>
                              )
                            })}
                        </tbody>
                    </Table>
                </PopoverBody>
            </UncontrolledPopover>
        </div>
  )
}

export default LeaderboardPopover
