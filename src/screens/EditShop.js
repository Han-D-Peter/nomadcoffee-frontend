import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import routes from "../routes";

const SEE_COFFEESHOP_QUERY = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      ok
      error
      coffeeShop {
        name
        latitude
        longitude
        categories {
          id
          name
        }
      }
    }
  }
`;

const EDIT_COFFEE_SHOP_MUTATION = gql`
  mutation editCoffeeShop(
    $id: Int!
    $name: String!
    $latitude: String!
    $longitude: String!
    $categories: String!
  ) {
    editCoffeeShop(
      id: $id
      name: $name
      latitude: $latitude
      longitude: $longitude
      categories: $categories
    ) {
      ok
      error
    }
  }
`;

const EditShop = () => {
  const history = useHistory();
  const location = useLocation();
  const shopId = parseInt(location.pathname.split("/")[2]);
  const onCompleted = () => {
    history.push(routes.home);
  };

  const { loading, error, data } = useQuery(SEE_COFFEESHOP_QUERY, {
    variables: { id: shopId },
  });

  const [editCoffeeShop, { loading: editLoading }] = useMutation(
    EDIT_COFFEE_SHOP_MUTATION,
    {
      onCompleted,
    }
  );

  const { register, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
  });
  if (loading) return null;

  const {
    seeCoffeeShop: { coffeeShop },
  } = data;

  const categoriesStringify = coffeeShop.categories
    .map(item => item.name)
    .join();

  const onSubmitValid = data => {
    if (editLoading) {
      return;
    }
    const { name, latitude, longitude, categories } = getValues();
    console.log(parseInt(shopId), name, latitude, longitude, categories);
    editCoffeeShop({
      variables: {
        id: parseInt(shopId),
        name,
        latitude,
        longitude,
        categories,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitValid)}>
      <Input
        ref={register({
          required: "name is required",
        })}
        name="name"
        type="text"
        placeholder="Name"
        defaultValue={coffeeShop.name}
      />
      <Input
        ref={register({
          required: "latitude is required",
        })}
        name="latitude"
        type="text"
        placeholder="Latitude"
        defaultValue={coffeeShop.latitude}
      />
      <Input
        ref={register({
          required: "longitude is required",
        })}
        name="longitude"
        type="text"
        placeholder="Longitude"
        defaultValue={coffeeShop.longitude}
      />
      <Input
        ref={register({
          required: "categories is required",
        })}
        name="categories"
        type="text"
        placeholder="Categories"
        defaultValue={categoriesStringify}
      />
      <Button type="submit" value={loading ? "Loading..." : "Edit Shop"} />
    </form>
  );
};

export default EditShop;
