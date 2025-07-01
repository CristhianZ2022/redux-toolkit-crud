import { Badge, Button, Card, TextInput, Title } from '@tremor/react';
import { useState } from 'react';
import { useUsersActions } from '../hooks/useUsersActions';

export function CreateNewUser() {
  const { addUser } = useUsersActions();
  const [result, setResult] = useState<'ok' | 'error' | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setResult(null);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const github = formData.get('github') as string;

    if (!name || !email || !github) {
      setResult('error');
      return;
    }

    addUser({ name, email, github });
    setResult('ok');
    form.reset();
  };

  return (
    <Card style={{ marginTop: '20px' }}>
      <Title>Create new user</Title>
      <form onSubmit={handleSubmit}>
        <TextInput name="name" placeholder="Name" />
        <TextInput type='email' name="email" placeholder="Email" />
        <TextInput name="github" placeholder="Github" />
        <div>
          <Button type="submit" style={{ marginTop: '20px' }}>
            Create new user
          </Button>
          <span>
            {result === 'ok' &&
              <Badge style={{ marginLeft: '10px', color: 'green' }}>Created</Badge>
            }
            { result === 'error' &&
              <Badge style={{ marginLeft: '10px', color: 'red' }}>Error</Badge>
            }
          </span>
        </div>
      </form>
    </Card>
  );
}
