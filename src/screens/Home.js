import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { logUserOut } from "../apollo";
import routes from "../routes";

const COFFEE_SHOP_QUERY = gql`
  query seeCoffeeShops($page: Int!) {
    seeCoffeeShops(page: $page) {
      id
      name
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(COFFEE_SHOP_QUERY, {
    variables: { page: 1 },
  });
  if (loading) return null;

  const { seeCoffeeShops } = data;

  return (
    <div>
      <h1>Home!</h1>
      <button onClick={() => logUserOut(false)}>Log out now!</button>
      <Link to={routes.create}>create</Link>
      {seeCoffeeShops.map(shop => (
        <>
          <h3 key={shop.id}>{shop.name}</h3>
          <Link to={routes.editShop + shop.id}>edit</Link>
        </>
      ))}
    </div>
  );
};

export default Home;
