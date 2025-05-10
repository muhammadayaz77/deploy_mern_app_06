import React from 'react'

import { ToastContainer } from 'react-toastify'

function Toast() {
  return (
  <ToastContainer 
    position="bottom-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    >

    </ToastContainer>
  )
}

export default Toast