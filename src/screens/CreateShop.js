import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import routes from "../routes";

const CREATE_COFFEESHOP_MUTATION = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $categories: String!
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      categories: $categories
    ) {
      name
    }
  }
`;

function CreateShop() {
  const history = useHistory();
  const onCompleted = () => {
    history.push(routes.home);
  };
  const [createCoffeeShop, { loading }] = useMutation(
    CREATE_COFFEESHOP_MUTATION,
    { onCompleted }
  );
  const { register, handleSubmit } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = data => {
    if (loading) {
      return;
    }
    console.log(data);
    createCoffeeShop({
      variables: {
        ...data,
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
      />
      <Input
        ref={register({
          required: "latitude is required",
        })}
        name="latitude"
        type="text"
        placeholder="Latitude"
      />
      <Input
        ref={register({
          required: "longitude is required",
        })}
        name="longitude"
        type="text"
        placeholder="Longitude"
      />
      <Input
        ref={register({
          required: "categories is required",
        })}
        name="categories"
        type="text"
        placeholder="Categories"
      />
      <Button type="submit" value={loading ? "Loading..." : "Create Shop"} />
    </form>
  );
}

export default CreateShop;
