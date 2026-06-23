import UserService, {type CreateUserPayload} from "../../services/user.js";

const queries = {
    getUserToken: async(_:any, payload: {email:string, password: string}) =>{
        const token = UserService.getUserToken({
            email: payload.email,
            password:payload.password
        })
        return token;
    },
    getCurrentLoggedInUser: async (_:any, parameters:any, context:any)=>{
        if (context && context.user) {
            const userId = context.user.id;
            return UserService.getUserById(userId);

        }
        throw new Error("LAMO get rekit");
    }
};

const mutations = {
    createUser: async (_: any, payload: CreateUserPayload) => {
        const res = await UserService.createUser(payload);
        return res.id;
    }
};

export const resolvers = {queries, mutations};