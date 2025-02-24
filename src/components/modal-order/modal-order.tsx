import OrderProcess from '../burger-constructor/order-details/order-details'

import {TModalOrder} from '../../utils/types'

const ModalOrder = ({ orderNumber }: TModalOrder): React.JSX.Element => {

  return (
    <OrderProcess orderNumber={orderNumber} />
  )
}

export default ModalOrder;