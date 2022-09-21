import React, { useEffect } from 'react'

export default function Dashboard() {

  useEffect(() => {
    console.log("Dashboard renderd")
  })

  return (
    <>
        <h1 style={{'margin-left': '300px'}}>Dashboard</h1>
    </>
  )
}
