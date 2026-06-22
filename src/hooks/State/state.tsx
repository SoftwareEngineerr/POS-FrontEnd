import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

export const State = useSelector((State)=>State)
export const dispatch = useDispatch()
// const State = props => {
//   return {
//     url , dispatch
//   }
// }

// State.propTypes = {}

// export default State