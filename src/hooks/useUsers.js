 import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { findAll, remove, save, update } from "../services/userService";
import { AuthContext } from "../auth/context/AuthContext";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initialUserForm,
  loadingUser,
  addUser,
  removeUser,
  updateUser,
  onUserSelectedForm,
  onCloseForm,
  onOpenForm,
  loadingError,
} from "../store/slices/users/usersSlice";


export const useUsers = () => {


  const { users,userSelected,visibleForm,errors } = useSelector((state) => state.users);

  const dispatch = useDispatch();

 
  const navigate = useNavigate();

  const { login, handlerLogout } = useContext(AuthContext);

  const getUsers = async () => {
    try {
      const result = await findAll();
      dispatch(loadingUser(result.data));
    } catch (error) {
      if (error.response?.status == 401) {
        handlerLogout();
      } else {
        throw error;
      }
    }
  };

  const handlerAddUser = async (user) => {

    if (!login.isAdmin) return;

    let response;
    try {
      if (user.id === 0) {
        response = await save(user);
        dispatch(addUser(response.data));
      } else {
        response = await update(user);
        dispatch(updateUser(response.data));
      }
      Swal.fire(
        user.id === 0 ? "Usuario Creado" : "Usuario Actualizado",
        user.id === 0
          ? "El usuario ha sido creado con exito!"
          : "El usuario ha sido actualizado con exito!",
        "success"
      );
      handlerCloseForm();
      navigate("/users");
    } catch (error) {
      if (error.response && error.response.status == 400) {
        dispatch(loadingError(error.response.data));
      } else if (
        error.response &&
        error.response.status == 500 &&
        error.response.data?.message?.includes("constraint")
      ) {
        if (error.response.data?.message?.includes("UK_username")) {
            dispatch(loadingError({ username: "El username ya existe!" }));
        }
        if (error.response.data?.message?.includes("UK_email")) {
            dispatch(loadingError({ email: "El email ya existe!" }));
        }
      } else if (error.response?.status == 401) {
        handlerLogout();
      } else {
        throw error;
      }
    }
  };

  const handlerRemoveUser = (id) => {
 

    if (!login.isAdmin) return;

    Swal.fire({
      title: "Esta seguro que desea eliminar?",
      text: "Cuidado el usuario sera eliminado!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await remove(id);
          dispatch(removeUser(id));
          Swal.fire(
            "Eliminado!",
            "El usuario ha sido eliminado con exito.",
            "success"
          );
        } catch (error) {
          if (error.response?.status == 401) {
            handlerLogout();
          } else {
            throw error;
          }
        }
      }
    });
  };

  const handlerUserSelectedForm = (user) => {
      dispatch(onUserSelectedForm(...user));
  };

  const handlerOpenForm = () => {
    dispatch(onOpenForm());
  };

  const handlerCloseForm = () => {
   dispatch(onCloseForm());
   dispatch(loadingError({}));
  };
  return {
    users,
    userSelected,
    initialUserForm,
    visibleForm,
    errors,
    handlerAddUser,
    handlerRemoveUser,
    handlerUserSelectedForm,
    handlerOpenForm,
    handlerCloseForm,
    getUsers,

  };
};
