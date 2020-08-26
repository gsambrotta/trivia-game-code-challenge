import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button/Button'
import styles from './Card.module.css'

function Card({
  title,
  isOutline,
  buttonTheme,
  buttonLabel,
  buttonLink,
  buttonOnClick,
  children,
}) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      {children}
      {buttonLabel && (
        <Button
          isOutline={isOutline}
          theme={buttonTheme}
          label={buttonLabel}
          link={buttonLink}
          onClick={buttonOnClick}
        />
      )}
    </div>
  )
}

export default Card

Card.propTypes = {
  title: PropTypes.string,
}
