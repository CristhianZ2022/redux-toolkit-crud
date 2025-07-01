import { configureStore, type Middleware } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import usersReducer, { rollbackUser, type UsersWithId } from './users/slice';

const persistanceLSMiddleware: Middleware = (store) => (next) => (action) => {
  next(action);
  localStorage.setItem('_redux_state_', JSON.stringify(store.getState()));
};

const syncWithDatabaseMiddleware: Middleware =
  (store) => (next) => (action) => {
    const { type, payload } = action;
    const previousState = store.getState();

    next(action);

    if (type === 'users/addNewUser') {
      fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (res.ok) {
            toast.success(`User ${payload.name} created`);
          }
        })
        .catch((err) => {
          toast.error(err`Error creating user ${payload.name}`);
        });
    }

    if (type === 'users/editUserByID') {
      const { id, ...updates } = payload;
      const userToUpdate = previousState.users.find(
        (user: UsersWithId) => user.id === id
      );

      if (!userToUpdate) {
        toast.error(`User ${id} not found`);
        return;
      }

      fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
        .then((res) => {
          if (res.ok) {
            toast.success(`User ${userToUpdate.name} updated`);
          } else {
            throw new Error('Error updating user');
          }
        })
        .catch((err) => {
          toast.error(err`Error updating user ${userToUpdate.name}`);
          store.dispatch(rollbackUser(userToUpdate));
        });
    }

    if (type === 'users/deleteUserByID') {
      const userToRemoveID = payload;
      const userToRemove = previousState.users.find(
        (user: UsersWithId) => user.id === userToRemoveID
      );
      if (!userToRemove) {
        toast.error(`User ${userToRemoveID} not found`);
        return;
      }

      next(action);

      fetch(`https://jsonplaceholder.typicode.com/users/${userToRemoveID}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Error deleting user');
          }
          toast.success(`User ${userToRemove.name} deleted`);
        })
        .catch((err) => {
          toast.error(`Error deleting user ${userToRemove.name}`);
          store.dispatch(rollbackUser(userToRemove));
          throw err;
        });
      return;
    }
  };

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      persistanceLSMiddleware,
      syncWithDatabaseMiddleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
