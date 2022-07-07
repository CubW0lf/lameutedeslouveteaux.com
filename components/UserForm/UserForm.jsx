import { useUxContext } from "../../contexts/uxContext";
import { Form, Input } from "../Form/Form";
import { me, updateMe } from "../../directus/utils";

const UserForm = ({ user, setCurrentUser }) => {
  const { handleFlash } = useUxContext();

  const submit = async (credentials) => {
    await updateMe({
      first_name: credentials.first_name,
      last_name: credentials.last_name,
      email: credentials.email,
      location: credentials.location,
      title: credentials.title,
    })
      .then(() => {
        handleFlash("success", `Merci ${credentials.first_name}, vos infos ont bien été mise à jour`, 3000);
        me()
          .then((response) => setCurrentUser(response))
          .catch((err) => handleFlash("error", err.message, 3000));
      })
      .catch((err) => handleFlash("error", err.message, 3000));
  };

  return (
    <>
      <Form onSubmit={submit}>
        <Input
          name="first_name"
          label="Prénom"
          placeholder="Prénom"
          defaultValue={user.first_name}
          options={{ required: "Le Prénom est requis" }}
        />
        <Input
          name="last_name"
          label="Nom de Famille"
          placeholder="Nom de Famille"
          defaultValue={user.last_name}
          options={{ required: "Le Nom de famille est requis" }}
        />
        <Input
          type="text"
          label="Mail"
          name="email"
          placeholder="Mail"
          defaultValue={user.email}
          options={{
            required: "L'email est requis",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Merci d'entrer un email valide",
            },
          }}
        />

        <Input label="Localisation" name="location" placeholder="Localisation" defaultValue={user.location} options={{}} />
        <Input
          label="Activité principale"
          name="title"
          placeholder="Activité Principale"
          defaultValue={user.title}
          options={{}}
        />
        <input type="submit" value="Mettre à jour" />
      </Form>
    </>
  );
};

export default UserForm;
