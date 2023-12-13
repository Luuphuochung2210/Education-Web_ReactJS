export const INITSTATE = {
  status: false,

  login: {
    id: "",
    firstname: "unknown",
    lastname: "unknown",
    username: "unknown",
    email: "unknown",
    role: "unknown",
    status: false,
  },

  users: [
    // {
    //   firstname: "admin",
    //   lastname: "",
    //   email: "admin",
    //   password: "123",
    //   role: "admin",
    //   status: false,
    // },
    // {
    //   firstname: "Tai",
    //   lastname: "Ngo",
    //   email: "ndtt.2712@gmail.com",
    //   password: "123456",
    //   role: "admin",
    //   status: false,
    // },
  ],

  allcourses: [],

  displayadd: false,

  courseiddisplay: "",
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
    case "SET_DISPLAYADD":
      return {
        ...state,
        displayadd: action.payload,
      };
    case "SET_COURSEIDDISPLAY":
      return {
        ...state,
        courseiddisplay: action.payload,
      };
    case "SET_ALLCOURSES":
      return {
        ...state,
        allcourses: action.payload,
      }
    default:
      throw new Error("Invalid Action");
  }
}
