import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const UserForm = ({ handlerAddUser, initialUserForm, userSelected,handlerCloseForm }) => {
  const [userForm, setUserForm] = useState(initialUserForm);
  const { id, username, email, password } = userForm;

  useEffect(() => {
    setUserForm({ ...userSelected, password: "" });
  }, [userSelected]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUserForm({ ...userForm, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!username || !email || (!password && id === 0)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Todos los campos son obligatorios!",
      });
      return;
    }

    handlerAddUser(userForm); //le pasamos el userform al componente padre
    setUserForm(initialUserForm);
  };
  //guardar el user form en el listado de usuarios

  return (
    <form onSubmit={onSubmit}>
      <input
        className="form-control my-3 w-75"
        placeholder="username"
        name="username"
        value={username}
        onChange={onInputChange}
      />
      <input
        className="form-control my-3 w-75"
        placeholder="email"
        name="email"
        value={email}
        onChange={onInputChange}
      />
      {id === 0 && (
        <input
          className="form-control my-3 w-75"
          placeholder="password"
          name="password"
          value={password}
          onChange={onInputChange}
        />
      )}

      <input type="hidden" name="id" value={id} />
      

      <button type="submit" className="btn btn-primary">
        {id === 0 ? "Add" : "Update"}
      </button>
      <button type="button" className="btn btn-primary mx-2" onClick={handlerCloseForm}>Cerrar formulario</button>
    </form>
    
  );
};
