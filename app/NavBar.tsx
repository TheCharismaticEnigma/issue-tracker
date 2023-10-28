'use client';

import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  DropdownMenuLabel,
  Flex,
  Text,
} from '@radix-ui/themes';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';

// CREATING SUB COMPONENTS TO PRESERVE THE LOGIC!
// AuthStatus and NavLinks sub components.

const AuthStatus = () => {
  const { data: session, status } = useSession();

  return (
    <Box>
      {status === 'authenticated' && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <button>
              <Avatar
                src={session.user!.image!}
                size={'2'}
                radius="full"
                fallback={session.user?.name?.[0].toUpperCase() || '?'}
                className="cursor-pointer"
                onClick={() => console.log('clicked')}
              />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content className="mt-0.5">
            <DropdownMenuLabel>
              <Text size={'3'}>Email - {session.user!.email!}</Text>
            </DropdownMenuLabel>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout">Logout</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
      {status === 'unauthenticated' && (
        <Link href="/api/auth/signin" className="navLink">
          Login
        </Link>
      )}
    </Box>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const linkColor = (href: string) => {
    // Looks up currentPath variable in the scope chain.
    return href === currentPath ? 'text-blue-400' : 'white';
  };

  const navLinks = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];

  return (
    <ul className="flex space-x-6">
      {navLinks.map(({ label, href }) => (
        <li key={label}>
          <Link href={href} className={`${linkColor(href)} navLink  `}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const NavBar = () => {
  // With useSession() => get access to current session.
  // provides access to status of authentication and data of the user.

  return (
    <nav className=" text-white border-b  mb-5 py-3 px-5 ">
      <Container>
        <Flex justify={'between'}>
          <Flex align={'center'} gap={'5'}>
            <Link href="/">
              <AiFillBug />
            </Link>

            <NavLinks />
          </Flex>

          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
