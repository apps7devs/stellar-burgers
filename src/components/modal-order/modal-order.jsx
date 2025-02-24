import OrderProcess from '../burger-constructor/order-details/order-details'

function ModalOrder ({ orderNumber }) {

  return (
    <OrderProcess orderNumber={orderNumber} />
  )
}

export default ModalOrder;