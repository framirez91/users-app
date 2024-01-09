
import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";
import { useUsers } from "../hooks/useUsers";

export const UsersPage = () => {
  const {
    users,
    initialUserForm,
    userSelected,
    visibleForm,

    handlerAddUser,
    handlerDeleteUser,
    handlerUserSelectedForm,
    handlerCloseForm,
    handlerOpenForm,
  } = useUsers();

  return (
    <>
 
      {!visibleForm || 
       <UserModalForm 
       handlerAddUser={handlerAddUser} 
       handlerCloseForm={handlerCloseForm} 
       userSelected={userSelected}
       initialUserForm={initialUserForm}
        />
      }
      <div className="container my-4 ">
        <h2>Users APP</h2>
        <div className="row">
          <div className="col">
            {visibleForm || (
              <button
                className="btn btn-primary my-2"
                onClick={handlerOpenForm}
              >
                Nuevo Usuario
              </button>
            )}
            {users.length === 0 ? (
              <div className="alert alert-info">
                No hay usuarios registrados
              </div>
            ) : (
              <UsersList
                users={users}
                handlerDeleteUser={handlerDeleteUser}
                handlerUserSelectedForm={handlerUserSelectedForm}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
