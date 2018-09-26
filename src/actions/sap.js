import api from '../api'

export const IO_RECEIVED = 'IO_RECEIVED'

export const internalOrdersReceived = orders => ({
  type: IO_RECEIVED,
  payload: orders
})

export const getInternalOrders = () => dispatch => {
  api.sap.getInternalOrders().then(data => {
    dispatch(internalOrdersReceived(data))
  })
}
