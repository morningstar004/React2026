import React from 'react'
import { useParams } from 'react-router-dom'

const User = () => {

    const {id} = useParams()

  return (
    <div className='text-3xl text-amber-50 bg-gray-500 py-2 mx-auto text-center'>
      User: {id}
    </div>
  )
}

export default User
