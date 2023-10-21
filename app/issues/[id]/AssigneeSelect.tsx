/*  
    REACT CONTEXT IS ONLY AVAILABLE IN QUERY CLIENT. 
    Create the select dropdown component.
    Create the API to retrieve the users from DB.
    Supplant effect, state hooks with  React query to work w/ the 
    backend and fetch from the api and if necessary, cache the result. 
    (QueryClientProvider as context is ONLY for client components)

    Select Component => API => React Query Custom Provider => useQuery() hook
*/

'use client';

import { type User } from '@/schemas/userSchema';
import { Select, Text } from '@radix-ui/themes';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface UsersAxiosResponse {
  success: boolean;
  users: User[];
}

const AssigneeSelect = () => {
  const [users, setUsers] = useState([] as User[]);

  useEffect(() => {
    const fetchUsers = async () => {
      const {
        data: { users },
      } = await axios.get<UsersAxiosResponse>('/api/users'); // returns an object w/ data prop

      setUsers(users);
    };

    fetchUsers();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assigned User" />
      <Select.Content>
        <Select.Group>
          <Select.Label>ALL USERS</Select.Label>
          <Select.Separator />

          {users.length > 0 &&
            users.map((user, index) => {
              return (
                <Select.Item value={user._id} key={user._id}>
                  {user.name}
                </Select.Item>
              );
            })}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
