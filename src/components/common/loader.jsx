import React from 'react'
import loading from '../../assets/images/loading.svg'

const Loader = () => (
  <div className="container">
    <div className="loader fullscreen">
      <img src={loading} alt="loading"/>
    </div>
  </div>
)

export default Loader
