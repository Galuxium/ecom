// SettingsPage.tsx

import React from 'react';
import { useRouter } from 'next/router';

import { useUser } from '@clerk/clerk-react';

import { trpc } from '@/utils/trpc';

import { Button, Form, Input, Spinner } from '@/components/ui';

const SettingsPage: React.FC = () => {
  const router = useRouter();
  const { user, isLoaded: isUserLoaded } = useUser();

  const { mutate: updateUser, isLoading: isUpdating } = trpc.user.update.useMutation();

  const [firstName, setFirstName] = React.useState(user?.firstName || '');
  const [lastName, setLastName] = React.useState(user?.lastName || '');
  const [email, setEmail] = React.useState(user?.emailAddresses[0]?.emailAddress || '');

  const isFormDisabled = !firstName || !lastName || !email || isUpdating;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateUser({
      firstName,
      lastName,
      emailAddresses: [{ emailAddress: email }],
    });
    router.push('/dashboard');
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Form className="w-full max-w-md" onSubmit={handleSubmit}>
        <Form.Title>Update Profile</Form.Title>
        <Form.Field label="First Name" name="firstName">
          <Input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            disabled={!isUserLoaded}
          />
        </Form.Field>
        <Form.Field label="Last Name" name="lastName">
          <Input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            disabled={!isUserLoaded}
          />
        </Form.Field>
        <Form.Field label="Email" name="email">
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={!isUserLoaded}
          />
        </Form.Field>
        <div className="mt-4 flex w-full items-center justify-between">
          <Button type="submit" disabled={isFormDisabled}>
            {isUpdating ? <Spinner /> : 'Update'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SettingsPage;