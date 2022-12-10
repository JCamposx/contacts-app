const API = import.meta.env.VITE_API_URL;

export default {
  home: "/",
  contacts: {
    _: API + "contacts",
    create: "contacts/create",
  },
};
