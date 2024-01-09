import React from 'react'
import { UserRow } from './UserRoW'

export const UsersList = ({users =[],handlerDeleteUser,handlerUserSelectedForm}) => {
  
  return (
    <table className='table table-hover table-striped'>
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Email</th>
          <th>update</th>
          <th>delete</th>
        </tr>
      </thead>
      <tbody>
       {
        users.map(({id,username,email,})=>(
          <UserRow key={id} id={id} username={username} email={email} 
          handlerDeleteUser={handlerDeleteUser} 
          handlerUserSelectedForm={handlerUserSelectedForm} />
        ))
       }

      </tbody>
        
    </table>
   
  )
}
