import React from 'react'
import Card from '../Card/Card'
import styles from './WelcomeCard.module.css'

function WelcomeCard() {
  return (
    <Card
      title='Welcome to the Trivia Challenge!'
      buttonLabel='Begin'
      buttonLink='/questions'>
      <p>You will be presented with 10 True or False questions.</p>
      <p className={styles.bold}>Can you score 100%?</p>
    </Card>
  )
}

export default WelcomeCard
