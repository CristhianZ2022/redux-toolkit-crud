import { Button, Card, TextInput, Title } from "@tremor/react";
import type { UsersWithId } from "../stores/users/slice";

interface EditUsersProps {
  editingUser: UsersWithId;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCancel: () => void;
  formData: { name: string; email: string; github: string };
}

export function EditUsers( { editingUser, handleSubmit, handleChange, handleCancel, formData }: EditUsersProps) {
  return (
    <div className="mt-6">
      <Card>
        <Title>Edit User: {editingUser.name}</Title>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <TextInput
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
              className="mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <TextInput
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Gmail address"
              className="mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="github"
              className="text-sm font-medium text-gray-700"
            >
              GitHub
            </label>
            <TextInput
              id="github"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="Enter GitHub username"
              className="mt-1"
            />
          </div>
          <div className="flex space-x-2">
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              Save Changes
            </Button>
            <Button type="button" onClick={handleCancel} variant="secondary">
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
