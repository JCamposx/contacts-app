const API = import.meta.env.VITE_API_URL;

export const routes = {
  home: "/",
  contacts: {
    index: "/contacts",
    create: "/contacts/create",
    edit: "/contacts/:id/edit",
  },
  api: {
    contacts: {
      index: API + "/contacts",
      latest: API + "/contacts/latest",
      store: API + "/contacts",
      update: API + "/contacts/:id",
      show: API + "/contacts/:id",
      delete: API + "/contacts/:id",
    },
  },
};

export function url(path, args = {}) {
  const url = path.split("/");

  for (const urlKey in url) {
    for (const argsKey in args) {
      if (`:${argsKey}` === url[urlKey]) url[urlKey] = args[argsKey];
    }
  }

  return Object.keys(url)
    .map((key) => url[key])
    .join("/");
}
