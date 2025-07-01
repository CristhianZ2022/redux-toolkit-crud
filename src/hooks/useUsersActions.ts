import { addNewUser, deleteUserByID, editUserByID, type UserId } from '../stores/users/slice';
import type { Users } from './../stores/users/slice';
import { useAppDispatch } from './store';

export const useUsersActions = () => {
  const dispatch = useAppDispatch();

  const addUser = ({ name, email, github }: Users) => {
    dispatch(addNewUser({ name, email, github }));
  };

  const deleteUser = (id: UserId) => {
    dispatch(deleteUserByID(id));
  };

  const editUser = ({ id, ...updates }: Partial<Users> & { id: UserId }) => {
    dispatch(editUserByID({ id, ...updates }));
  };

  return { deleteUser, addUser, editUser };
};
