import React from 'react'
import RouteLayout from './routes/routes'

function App() {
  return (
    <div className='container-fluid d-flex flex-column align-items-center justify-content-center '
      style={{
        background: "#fefc01",
        width: "100%",
        height: "100vh",
      }}
    >
      <RouteLayout/>
    </div>
  )
}

export default App
