import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import styles from './Button.module.css'

function Button({ label, link, isOutline, theme, onClick }) {
  return (
    <div
      className={classnames(
        styles.button,
        { [styles.outline]: isOutline },
        { [styles[theme]]: theme }
      )}
      onClick={onClick}>
      {onClick ? label : <Link to={link}>{label}</Link>}
    </div>
  )
}

export default Button

Button.propTypes = {
  label: PropTypes.string.isRequired,
  link: PropTypes.string,
  isOutline: PropTypes.bool,
  theme: PropTypes.oneOf(['false', 'true']),
  onClick: PropTypes.func,
}
