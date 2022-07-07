import directus from "./directus";

// Auth

export const me = async () => {
  return await directus.users.me.read();
};

export const updateMe = async (credentials) => {
  return await directus.users.me.update(credentials);
};

export const changePassword = async (email) => {
  return await directus.auth.password.request(email);
};

export const createUser = async (credentials) => {
  return await directus.users.createOne(credentials);
};

export const login = async (credentials) => {
  return await directus.auth.login(credentials);
};

// Items

export const getAll = async (item) => {
  return directus
    .items(item)
    .readByQuery({ limit: -1, fields: ["*.*"] })
    .then((response) => response)
    .catch((error) => error);
};

export const getAllBy = async (item, query) => {
  return directus
    .items(item)
    .readByQuery(query)
    .then((response) => response)
    .catch((error) => error);
};

export const find = async (item, id) => {
  return await directus
    .items(item)
    .readOne(id, {
      fields: ["*.*"],
    })
    .then((response) => response)
    .catch((error) => error);
};

export const createItem = async (item, id) => {
  return await directus.items(item).createOne(id);
};

export const deleteItem = async (item, id) => {
  return await directus.items(item).deleteOne(id);
};

export const update = async (item, id) => {
  return await directus.items(item).updateOne(id);
};
