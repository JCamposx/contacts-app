const API = import.meta.env.VITE_API_URL;

export default {
  home: "/",
  contacts: {
    base: "/contacts",
    create: "/contacts/create",
  },
  api: {
    contacts: {
      base: API + "/contacts",
      latest: API + "/contacts/latest"
    }
  }
};
