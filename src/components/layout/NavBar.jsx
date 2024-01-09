export const NavBar = ({handlerLogout , login}) => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">User APP</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        <span className="nav-item fw-bold text-white mx-3">Bienvenido! {login.user?.username}</span>
        <button
        className="btn btn-outline-danger"
        onClick={handlerLogout}
        >Cerrar Sesion</button>
    
    </div>
  </div>
</nav>
  )
}
