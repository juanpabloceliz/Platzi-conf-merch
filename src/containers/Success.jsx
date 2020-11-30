import React, { useContext } from 'react'
import AppContext from '../context/AppContext'
import Map from '../components/Map'
import useGoogleAddress from '../hooks/useGoogleAddress'
import '../styles/components/Success.css'

const Success = () => {
  const { state } = useContext(AppContext)
  const { buyer } = state
  const location = useGoogleAddress(buyer[0].address)

  return (
    <div className="Succes">
      <div className="Success-content">
        <h2>{`${buyer.name} Thanks for buy`}</h2>
        <span>Your order will be at door soon...</span>
        <div className="Success-map">
          <Map data={location} />
        </div>
      </div>
    </div>
  )
}

export default Success
