import React, { useState, useEffect } from 'react'
import he from 'he'
import { useHistory } from 'react-router-dom'
import useGlobalState from '../../Hooks/useGlobalState'
import Card from '../Card/Card'
import ButtonGroup from '../ButtonGroup/ButtonGroup'
import Button from '../Button/Button'
import styles from './QuestionCard.module.css'

const initCurrCard = {
  title: '',
  question: '',
}

function QuestionCard() {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [errorFetch, setErrorFetch] = useState(false)
  const [questions, setQuestions] = useState([])
  const [currIndex, setCurrIndex] = useState(0)
  const [currQuestion, setCurrQuestion] = useState(initCurrCard)
  const [globalState, setGlobalState] = useGlobalState()

  useEffect(() => {
    async function fetchQuestions() {
      setIsLoading(true)
      try {
        const res = await fetch(
          'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean',
          {
            mode: 'cors',
            method: 'GET',
          }
        )
        const json = await res.json()
        setIsLoading(false)

        if (json.error) {
          console.log('err questions cannot be loaded', json.error)
          return setErrorFetch(true)
        } else {
          return setQuestions(json.results)
        }
      } catch (err) {
        setIsLoading(false)
        setErrorFetch(true)
        console.error(err)
      }
    }

    fetchQuestions()
  }, [])

  useEffect(() => {
    if (questions.length) {
      setCurrQuestion({
        title: he.decode(questions[currIndex].category),
        question: he.decode(questions[currIndex].question),
        answer: questions[currIndex].correct_answer === 'False' ? false : true,
      })
    }
  }, [questions, currIndex])

  function onSubmitAnswer(answer) {
    // If is the last question, go to results page
    if (currIndex + 1 === 10) {
      return history.push('/results')
    }

    setCurrIndex(() => currIndex + 1)
    const isCorrect = answer === currQuestion.answer

    if (isCorrect) {
      // increment total score
      const newTotScore = globalState.totalScore + 1
      const newAnswers = {
        question: currQuestion.question,
        isCorrect: true,
      }
      setGlobalState({
        totalScore: newTotScore,
        results: [...globalState.results, newAnswers],
      })
    } else {
      setGlobalState({
        results: [
          ...globalState.results,
          {
            question: currQuestion.question,
            isCorrect: false,
          },
        ],
      })
    }
    return
  }

  return (
    <Card>
      {!isLoading && !errorFetch && (
        <div className={styles.container}>
          <h1>
            {isLoading
              ? 'Loading question..'
              : errorFetch
              ? 'There was an error loading your question. Please reload the page and try again'
              : currQuestion.title}
          </h1>
          <div className={styles.question}>{currQuestion.question}</div>
          <small className={styles.count}>{`${currIndex + 1} of 10`}</small>
          <ButtonGroup
            buttonLeft={
              <Button
                label='True'
                onClick={() => onSubmitAnswer(true)}
                isOutline
                theme='true'
              />
            }
            buttonRight={
              <Button
                label='False'
                onClick={() => onSubmitAnswer(false)}
                isOutline
                theme='false'
              />
            }
          />
        </div>
      )}
    </Card>
  )
}

export default QuestionCard
