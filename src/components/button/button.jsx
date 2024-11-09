import React from 'react'
import './button.scss'

export function Button({ size, href, children, as, className }) {
  const DynamicTag = as || 'a'

  return (
    <DynamicTag
      href={href}
      className={`libras-button libras-button--${size} ${className}`}
    >
      {children}
    </DynamicTag>
  )
}

export default Button