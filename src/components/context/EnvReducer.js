export const INITSTATE = {
    status:false,

    account: [
        {
            firstname: "admin",
            lastname: "",
            username: "admin",
            email: "admin@gmail.com",
            password: "123456",
            role: "admin",
            status: true,
        }
    ],
};

export default function EnvReducer (state, action){
    switch(action.type){
        case "SET_ACCOUNT":
            return {
                ...state,
                account: action.payload
            }
        default:
            throw new Error("Invalid Action");
    }
}