import React, { useState, useEffect, Fragment } from 'react'
import useGlobalState from '../../Hooks/useGlobalState'
import classnames from 'classnames'
import Card from '../Card/Card'
import styles from './ResultsListCard.module.css'

function ResultsListCard() {
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [globalState, setGlobalState] = useGlobalState()
  const [showScores, setShowScores] = useState(globalState.results.length === 0)

  useEffect(() => {
    async function fetchScores() {
      setIsLoading(true)
      try {
        const res = await fetch('http://localhost:5000/api/scores', {
          mode: 'cors',
          method: 'GET',
        })
        const json = await res.json()
        if (json.error) {
          console.log('err scores cannot be loaded', json.error)
          return
        } else {
          return setGlobalState({ scores: json })
        }
      } catch (err) {
        console.error(err)
      }
      setIsLoading(false)
    }

    fetchScores()
  }, [showScores])

  async function onSubmit(username, total) {
    setIsLoading(true)
    try {
      const res = await fetch('http://localhost:5000/api/score', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          total,
        }),
      })

      const response = await res
      if (response.ok) {
        setIsLoading(false)
        setUsername('')
        setShowScores(true)
        return
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Card title='Your Score:' buttonLabel='Play Again?' buttonLink='/questions'>
      <h2 className={styles.score}>{`${
        isLoading || showScores ? '-' : globalState.totalScore
      } / 10`}</h2>

      {!isLoading && (
        <Fragment>
          <ul className={styles.list}>
            {!showScores &&
              globalState.results.map((result, i) => (
                <li key={i} className={styles.listItem}>
                  <span
                    className={classnames(styles.symbol, {
                      [styles.isCorrect]: result.isCorrect,
                    })}>
                    {result.isCorrect ? '+' : '-'}
                  </span>{' '}
                  <p>{result.question}</p>
                </li>
              ))}

            {showScores &&
              globalState.scores.map((score, i) => (
                <li key={i} className={styles.listItemRow}>
                  <span>{new Date(score.date).toLocaleDateString()}</span>
                  <span>{score.username}</span>
                  <strong>{`${score.total} / 10`}</strong>
                </li>
              ))}
          </ul>

          {!showScores && globalState.scores.length !== 0 && (
            <form onSubmit={() => onSubmit(username, globalState.totalScore)}>
              <label className={styles.label}>Save your score!</label>
              <input
                type='text'
                value={username}
                placeholder='your username'
                onChange={(e) => setUsername(e.target.value)}
              />
              <button className={styles.button}>save</button>
            </form>
          )}
        </Fragment>
      )}
    </Card>
  )
}

export default ResultsListCard
