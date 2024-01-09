import React from "react";

export const UserRow = ({ id, username, email, handlerDeleteUser,handlerUserSelectedForm }) => {
  

  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td>
        <button
          onClick={() =>
            handlerUserSelectedForm({
              id,
              username,
              email,
              
            })
          }
          type="button"
          className="btn btn-warning"
        >
          update
        </button>
      </td>
      <td>
        <button
          onClick={() => handlerDeleteUser(id)}
          type="button"
          className="btn btn-danger"
        >
          delete
        </button>
      </td>
    </tr>
  );
};
