import { UserType } from "../HW8";

type ActionType = { type: "sort"; payload: "up" | "down" } | { type: "check"; payload: number };

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => {
  // need to fix any
  switch (action.type) {
    case "sort": {
      // by name

      let newState = [...state].sort((a: UserType, b: UserType) => (a.name > b.name ? 1 : -1));

      return action.payload === "up" ? newState : newState.reverse();
      // return state
    }
    case "check": {
      return state.filter((f) => f.age >= action.payload); // need to fix
    }
    default:
      return state;
  }
};

// type tsarType= sortUsersACType
//
// type  sortUsersACType = ReturnType<typeof sortUsersAC>
//
// export const sortUsersAC =(name:string)=>{
//     return{
//         type: 'sort',
//         payload:{
//             name
//         }
//     }as const
// }
