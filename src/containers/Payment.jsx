import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { PayPalButton } from 'react-paypal-button'
import AppContext from '../context/AppContext'
import '../styles/components/Payment.css'

const Payments = () => {
  const { state, addNewOrder } = useContext(AppContext)
  const { cart, buyer } = state
  const history = useHistory()
  const paypalOptions = {
    clientId:
      'Aa1t6tejdTnJXtkDDW9pW795FsO7vp2KE84oPkzw-6MWzBpXj9SViC_MqSGXPGTuK2gId2uPTEpueClP',
    intent: 'capture',
    currency: 'USD',
  }

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect',
  }

  const handlePaymentSuccess = (data) => {
    if (data.status === 'COMPLETED') {
      const newOrder = {
        buyer,
        products: cart,
        payment: data,
      }
      addNewOrder(newOrder)
      history.push('/checkout/success')
    }
  }

  const handleSumTotal = () => {
    const reducer = (accumulator, currentValue) =>
      accumulator + currentValue.price
    const sum = cart.reduce(reducer, 0)
    return sum
  }

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3>Order resume:</h3>
        {cart.map((item) => (
          <div className="Payment-item" key={item.title}>
            <div className="Payment-element">
              <h4>{item.title}</h4>
              <span>$ {item.price}</span>
            </div>
          </div>
        ))}
        <div className="Payment-button">
          <PayPalButton
            paypalOptions={paypalOptions}
            buttonStyles={buttonStyles}
            amount={handleSumTotal()}
            onPaymentStart={() => console.log('start payment')}
            onPaymentSuccess={(data) => handlePaymentSuccess(data)}
            onPaymentError={(error) => console.log(error)}
            onPaymentCancel={(data) => console.log(data)}
          />
        </div>
      </div>
    </div>
  )
}

export default Payments
