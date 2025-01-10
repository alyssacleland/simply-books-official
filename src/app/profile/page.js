'use client';

import React from 'react';
import { Button } from 'react-bootstrap';
import User from '../../components/User';
import { useAuth } from '../../utils/context/authContext';
import { signOut } from '../../utils/auth';

export default function Profile() {
  const { user } = useAuth();
  console.log('user object:', user);
  return (
    <div>
      <User user={user} />
      <Button variant="danger" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}
