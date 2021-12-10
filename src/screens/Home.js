import { isLoggedInVar } from "../apollo";

const Home = ({ setIsLoggedIn }) => {
  return (
    <div>
      <h1>Home!</h1>
      <button onClick={()=isLoggedInVar(false)}>Log out now!</button>
    </div>
  );
};

export default Home;
