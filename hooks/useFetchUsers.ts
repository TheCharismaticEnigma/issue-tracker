import { type User } from '@/schemas/userSchema';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface UsersAxiosResponse {
  success: boolean;
  users: User[];
}

const useFetchUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => {
      return axios
        .get<UsersAxiosResponse>('/api/users')
        .then(({ data: { users } }) => {
          return users;
        });
    },
    staleTime: 120 * 1000, // 2mins before data is stale
    retry: 4,
  });
};

export default useFetchUsers;
