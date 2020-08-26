import React from 'react'
import PropTypes from 'prop-types'
import styles from './ButtonGroup.module.css'

function ButtonGroup({ buttonLeft, buttonRight }) {
  return (
    <div className={styles.container}>
      <div className={styles.left}>{buttonLeft}</div>
      <div className={styles.right}>{buttonRight}</div>
    </div>
  )
}

export default ButtonGroup

ButtonGroup.propTypes = {
  buttonLeft: PropTypes.node,
  buttonRight: PropTypes.node,
}
