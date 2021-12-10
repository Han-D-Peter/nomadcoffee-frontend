import { darkModeVar, isLoggedInVar } from "../apollo";

const Login = () => {
  return (
    <div>
      <h1>Login!</h1>
      <button onClick={() => isLoggedInVar(true)}>Log in now!</button>
      <button onClick={() => darkModeVar(true)}>To dark</button>
      <button onClick={() => darkModeVar(false)}>To light</button>
    </div>
  );
};

export default Login;
