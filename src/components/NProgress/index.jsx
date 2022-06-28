import React, { useEffect, Fragment } from 'react'
import 'nprogress/nprogress.css'

const nprogress = require('nprogress')

export default function NProgress() {
  useEffect(() => {
    nprogress.start()
    return () => {
      nprogress.done()
    }
  }, [])
  return (
    <Fragment />
  )
}
