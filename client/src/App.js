import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import WelcomeCard from './components/WelcomeCard/WelcomeCard'
import QuestionCard from './components/QuestionCard/QuestionCard'
import ResultsListCard from './components/ResultsListCard/ResultsListCard'
import styles from './App.module.css'

function App() {
  return (
    <BrowserRouter>
      <div className={styles.main}>
        <Route exact path='/' component={WelcomeCard} />
        <Route path='/questions' component={QuestionCard} />
        <Route
          render={(props) => <ResultsListCard {...props} />}
          path='/results'
        />
      </div>
    </BrowserRouter>
  )
}

export default App
