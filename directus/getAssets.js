const url = "https://api.lameutedeslouveteaux.com";

const getAssetURL = (id) => {
  if (!id) return null;
  return `${url}/assets/${id}`;
};

export default getAssetURL;
