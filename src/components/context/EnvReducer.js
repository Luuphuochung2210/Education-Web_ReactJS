export const INITSTATE = {
  status: false,

  login: {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    role: "",
    status: false,
  },

  users: [
    {
      firstname: "admin",
      lastname: "",
      username: "admin",
      email: "admin",
      password: "123",
      role: "admin",
      status: false,
    },
    {
      firstname: "Tai",
      lastname: "Ngo",
      username: "Jay",
      email: "ndtt.2712@gmail.com",
      password: "123456",
      role: "admin",
      status: false,
    },
  ],
};

export default function EnvReducer(state, action) {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "SET_LOGIN":
      return {
        ...state,
        login: action.payload,
      };
    default:
      throw new Error("Invalid Action");
  }
}
