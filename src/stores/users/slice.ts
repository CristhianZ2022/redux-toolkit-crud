import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const DEFAUL_STATE: UsersWithId[] = [
  {
    id: '1',
    name: 'Cristian Zambrano',
    email: 'cristian@gmail.com',
    github: 'cristian-dev',
  },
  {
    id: '2',
    name: 'Jakcon Dahl',
    email: 'jakcon@gmail.com',
    github: 'jakcon-dev',
  },
  {
    id: '3',
    name: 'Craig Smith',
    email: 'craig@gmail.com',
    github: 'craig-dev',
  },
];

export type UserId = string;

export interface Users {
  name: string;
  email: string;
  github: string;
}

export interface UsersWithId extends Users {
  id: UserId;
}

const getInitialUserID = (): number => {
  const persistedState = localStorage.getItem('_redux_state_');
  if (persistedState) {
    const users = JSON.parse(persistedState).users || DEFAUL_STATE;
    return users.length > 0
      ? Math.max(...users.map((user: UsersWithId) => parseInt(user.id)))
      : DEFAUL_STATE.length;
  }

  return DEFAUL_STATE.length;
}

let userID = getInitialUserID();

const initialState: UsersWithId[] = (() => {
  const persistedState = localStorage.getItem('_redux_state_');
  if (persistedState) {
    return JSON.parse(persistedState).users;
  }

  return DEFAUL_STATE;
})();

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<Users>) => {
      userID++;
      const id = userID.toString();

      state.push({ ...action.payload, id });
      localStorage.setItem('_redux_state_', JSON.stringify({ users: state }));
    },
    deleteUserByID: (state, action: PayloadAction<UserId>) => {
      const id = action.payload;
      return state.filter((user) => user.id !== id);
    },
    rollbackUser: (state, action: PayloadAction<UsersWithId>) => {
      const isUserAlreadyDefined = state.some(
        (user) => user.id === action.payload.id
      );
      if (!isUserAlreadyDefined) {
        state.push(action.payload);
      }
    },
    editUserByID: (state, action: PayloadAction<Partial<Users> & { id: UserId }>) => {
      const { id, ...updates } = action.payload;
      const userIndex = state.findIndex((user) => user.id === id);

      if (userIndex !== -1) {
        state[userIndex] = { ...state[userIndex], ...updates };
      }
    },
  },
});

export default usersSlice.reducer;
export const { addNewUser, deleteUserByID, rollbackUser, editUserByID } = usersSlice.actions;