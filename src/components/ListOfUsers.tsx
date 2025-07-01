import {
  Badge,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  TextInput,
  Title,
} from '@tremor/react';
import { useMemo, useState } from 'react';
import { useAppSelector } from '../hooks/store';
import { useUsersActions } from '../hooks/useUsersActions';
import type { UsersWithId } from '../stores/users/slice';
import { EditUsers } from './EditUsers';
import { UsersDeleteConfirm } from './UsersDeleteConfirm';

export function ListOfUsers() {
  const users = useAppSelector((state) => state.users);
  const { deleteUser, editUser } = useUsersActions();
  const [editingUser, setEditingUser] = useState<UsersWithId | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', github: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearchTerm, setActiveSearchTerm] = useState('');
  const [userToDelete, setUserToDelete] = useState<UsersWithId | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
          user.github.toLowerCase().includes(activeSearchTerm.toLowerCase())
      ),
    [users, activeSearchTerm]
  );

  const handleEditUser = (user: UsersWithId) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      github: user.github,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editingUser) return;

    editUser({
      id: editingUser.id,
      name: formData.name,
      email: formData.email,
      github: formData.github,
    });

    setEditingUser(null);
    setFormData({ name: '', email: '', github: '' });
  };

  const handleCancel = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', github: '' });
  };

  const handleSearch = () => {
    setActiveSearchTerm(searchTerm);
  };

  const handleDeleteUser = (user: UsersWithId) => {
    setUserToDelete(user);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      console.log('Confirming delete', userToDelete.id);
      setIsLoading(true);
      deleteUser(userToDelete.id);

      setTimeout(() => {
        setUserToDelete(null);
        setIsLoading(false);
      }, 200);
    }
  };

  return (
    <Card>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Title>
          Users
          <Badge style={{ marginLeft: '8px' }}>{filteredUsers.length}</Badge>
        </Title>
        <TextInput
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-4 mb-4 max-w-md"
        />
        <Button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-600 mt-4 mb-4 max-w-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
        </Button>
        <Button
          onClick={() => {
            setSearchTerm('');
            setActiveSearchTerm('');
          }}
          variant="secondary"
          className="mt-4 mb-4"
        >
          Clear
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell> Id </TableHeaderCell>
            <TableHeaderCell> Name </TableHeaderCell>
            <TableHeaderCell> Email </TableHeaderCell>
            <TableHeaderCell> Actions </TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredUsers.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    marginRight: '10px',
                  }}
                  src={`https://unavatar.io/github/${item.github}`}
                  alt={item.name}
                />
                {item.name}
              </TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                {/* Button to edit user */}
                <button type="button" onClick={() => handleEditUser(item)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </button>
                {/* Button to delete user */}
                <button type="button" onClick={() => handleDeleteUser(item)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editingUser && (
        <EditUsers
          handleCancel={handleCancel}
          editingUser={editingUser}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={formData}
        />
      )}
      <UsersDeleteConfirm
        isLoading={isLoading}
        userToDelete={userToDelete}
        confirmDelete={confirmDeleteUser}
        setUserToDelete={setUserToDelete}
      />
    </Card>
  );
}
