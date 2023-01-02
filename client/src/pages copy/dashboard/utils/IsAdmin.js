import React from 'react'

const IsAdmin = (user) => {
  return ["admin","editor"].includes(user?.role)
}

export default IsAdmin
