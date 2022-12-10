const API = import.meta.env.VITE_API_URL;

export const routes = {
  home: "/",
  contacts: {
    base: "/contacts",
    create: "/contacts/create",
  },
  api: {
    contacts: {
      base: API + "/contacts",
      latest: API + "/contacts/latest",
    },
  },
};

export function url(url, args = "") {
  return `${url}/${args}`;
}
