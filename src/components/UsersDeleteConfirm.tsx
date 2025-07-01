import { Button, Card, Title } from '@tremor/react';
import type { UsersWithId } from '../stores/users/slice';

interface UsersDeleteConfirmProps {
  confirmDelete: () => void;
  setUserToDelete: (user: UsersWithId | null) => void;
  userToDelete: UsersWithId | null;
  isLoading: boolean;
}

export function UsersDeleteConfirm({
  confirmDelete,
  setUserToDelete,
  userToDelete,
  isLoading,
}: UsersDeleteConfirmProps) {
  if (!userToDelete) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50"
    >
      <Card
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10, gap: 20 }}
        className="bg-slate-600 rounded-lg p-3 max-w-lg"
      >
        <Title>Confirm Delete</Title>
        <p>Are you sure you want to delete {userToDelete?.name}?</p>
        <div className="flex space-x-2 mt-4">
          <Button
            onClick={confirmDelete}
            className="bg-red-500 hover:bg-red-600"
            disabled={isLoading}
            loading={isLoading}
          >
            Delete
          </Button>
          <Button
            onClick={() => setUserToDelete(null)}
            variant="secondary"
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
}
