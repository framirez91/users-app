import { useReducer, useState } from "react";
import { userReducer } from "../reducer/userReducer";
import Swal from "sweetalert2";

const initialUsers = [
  {
    id: 1,
    username: "Fernando",
    password: "123456",
    email: "Fernando@email.com",
  },
];
const initialUserForm = {
  id: 0,
  username: "",
  email: "",
  password: "",
};
export const useUsers = () => {
  const [users, dispatch] = useReducer(userReducer, initialUsers); //userReducer userReducer creado, estado inicial
  const [userSelected, setUserSelected] = useState(initialUserForm); //estado inicial [{}
  const [visibleForm, setVisibleForm] = useState(false); //estado inicial [{}
  const handlerAddUser = (user) => {
    //recibe el user del userform
    const type = user.id === 0 ? "addUser" : "editUser"; //si el id es 0 es un nuevo usuario, si no es un usuario existente

    dispatch({
      type: type,
      payload: user,
    });
    Swal.fire(
      user.id === 0 ? "Usuario agregado" : "Usuario actualizado",
      user.id === 0
        ? "El usuario se agrego correctamente"
        : "El usuario se actualizo correctamente",
      "success"
    );
  };

  const handlerDeleteUser = (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podras revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: "deleteUser",
          payload: id,
        });
        Swal.fire("Borrado!", "El usuario ha sido borrado.", "success");
      }
    });

    setVisibleForm(false);//ocultar el formulario
    setUserSelected(initialUserForm);//limpiar el formulario
  };

  const handlerUserSelectedForm = (user) => {
    setUserSelected({ ...user });
    setVisibleForm(true);
  };

  const handlerOpenForm = () => {
    setVisibleForm(true);
  }

  const handlerCloseForm = () => {
    setVisibleForm(false);
    setUserSelected(initialUserForm);
  }




  return {
    users,
    initialUserForm,
    userSelected,
    visibleForm,

    handlerOpenForm,
    handlerCloseForm,
    handlerAddUser,
    handlerDeleteUser,
    handlerUserSelectedForm,
  };
};
