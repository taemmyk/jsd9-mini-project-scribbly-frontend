import { createContext } from 'react';

const initialUser = {
  id: 'user-123',
  name: 'John Doe',
  email: 'john.doe@example.com',
  roles: ['user', 'member'],
};

// const UserContext = createContext({ user: initialUser, });
const UserContext = createContext(null);


export default UserContext;