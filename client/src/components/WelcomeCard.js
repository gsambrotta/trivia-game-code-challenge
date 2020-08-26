import React from 'react'
import Card from './Card/Card'

function WelcomeCard() {
  return (
    <Card
      title='Welcome to the Trivia Challenge!'
      buttonLabel='Begin'
      buttonLink='/questions'>
      <p>You will be presented with 10 True or False questions.</p>
      <p>
        <strong>Can you score 100%?</strong>
      </p>
    </Card>
  )
}

export default WelcomeCard
