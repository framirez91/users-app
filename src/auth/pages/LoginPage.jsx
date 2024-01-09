import React, { useState } from "react";
import Swal from "sweetalert2";

const initalLoginForm = {
  username: "",
  password: "",
};

export const LoginPage = ({handlerLogin}) => {

  const [loginForm, setLoginForm] = useState(initalLoginForm);
  const { username, password } = loginForm; //destructuring para mapear los valores del objeto

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setLoginForm({ ...loginForm, [name]: value });
  };

 const onSubmit=(event)=>{
  event.preventDefault();
  if(!username||!password){
    Swal.fire('Error de Validacion','Username y Password son requeridos','error')
  }

  handlerLogin(loginForm);
  setLoginForm(initalLoginForm);
 }


  return (
    <div className="modal" style={{ display: "block" }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Login</h5>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              <input
                className="form-control my-3 w-75"
                placeholder="Username"
                name="username"
                value={username}
                onChange={onInputChange}
              />
              <input
                className="form-control my-3 w-75"
                placeholder="Password"
                name="password"
                value={password}
                type="password"
                onChange={onInputChange}
              />
            </div>

            <div className="modal-footer">
              <button className="btn btn-primary" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
