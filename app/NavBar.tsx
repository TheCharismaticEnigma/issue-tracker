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

  const navLinks = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];

  const classes = (href: string): string => {
    if (currentPath === href)
      return 'px-4 py-2 text-black font-medium rounded-3xl shadow-sm shadow-indigo-500 bg-gradient-to-r from-purple-300 to-indigo-300 ';

    return 'px-4 py-2 text-black font-medium rounded-3xl hover:shadow-sm hover:shadow-indigo-500 hover:bg-gradient-to-br from-blue-300 to-violet-300 ';
  };

  return (
    <Flex gap={'5'} px={'4'} className="md:ml-4">
      {navLinks.map(({ label, href }) => {
        //   If it is active link then return a separate styled link
        return (
          <Link
            key={label}
            href={href}
            style={{
              textDecoration: 'none',
            }}
            className={`${classes(href)}`}
          >
            {label}
          </Link>
        );
      })}
    </Flex>
  );
};

const AppLogo = () => {
  return (
    <div className=" p-1 md:mb-0 ">
      <Link href={'/'}>
        <svg
          aria-label="Atlassian Trello"
          height="37.5"
          role="img"
          viewBox="0 0 312 105"
          width="111.42857142857143"
          xmlns="http://www.w3.org/2000/svg"
          className="Logo-sc-1anfgcw-0 gguOta"
        >
          <linearGradient
            id="trello-logo-gradient-default5AtWoTsGiDeDk1CGAXJq8g"
            x1="49.992%"
            x2="49.992%"
            y1="100%"
            y2=".016%"
          >
            <stop offset="0" stopColor="#0052cc"></stop>
            <stop offset="1" stopColor="#2684ff"></stop>
          </linearGradient>
          <path
            d="m55.3 40.6h-47.5c-4.1 0-7.4 3.3-7.4 7.4v47.6c0 4.1 3.3 7.4 7.4 7.4h47.5c4.1 0 7.4-3.3 7.4-7.4v-47.6c0-4.1-3.3-7.4-7.4-7.4zm-28.1 44.9c0 1.4-1.1 2.5-2.5 2.5h-10.4c-1.4 0-2.5-1.1-2.5-2.5v-30.9c0-1.4 1.1-2.5 2.5-2.5h10.4c1.4 0 2.5 1.1 2.5 2.5zm24-14.2c0 1.4-1.1 2.5-2.4 2.5h-10.5c-1.4 0-2.5-1.1-2.5-2.5v-16.7c0-1.4 1.1-2.5 2.5-2.5h10.4c1.4 0 2.5 1.1 2.5 2.5z"
            fill="url(#trello-logo-gradient-default5AtWoTsGiDeDk1CGAXJq8g)"
          ></path>
          <g fill="#253858" transform="translate(87 40)">
            <path d="m42.6 5.2v12.1h-14.3v45.7h-13.8v-45.8h-14.3v-12z"></path>
            <path d="m60.2 63h-12.7v-45h12.7v8.6c2.4-6.1 6.3-9.7 13.2-9.2v13.3c-9-.7-13.2 1.5-13.2 8.7z"></path>
            <path d="m143 63.4c-8.4 0-13.6-4-13.6-13.5v-49.3h12.8v47.5c0 2.7 1.8 3.7 4 3.7.6 0 1.3 0 1.9-.1v11.1c-1.7.4-3.4.6-5.1.6z"></path>
            <path d="m169.8 63.4c-8.4 0-13.6-4-13.6-13.5v-49.3h12.8v47.5c0 2.7 1.8 3.7 4 3.7.6 0 1.3 0 1.9-.1v11.1c-1.7.4-3.4.6-5.1.6z"></path>
            <path d="m181 40.5c0-13.9 8-23.4 21.8-23.4s21.6 9.5 21.6 23.4-7.9 23.6-21.6 23.6-21.8-9.8-21.8-23.6zm12.5 0c0 6.8 2.8 12.1 9.3 12.1s9.1-5.4 9.1-12.1-2.8-12-9.1-12-9.3 5.2-9.3 12z"></path>
            <path d="m90.6 44.6c3.6.4 7.2.6 10.7.6 9.8 0 18-2.6 18-12.1 0-9.2-8.5-16.1-18.7-16.1-13.7 0-22.5 10-22.5 23.8 0 14.4 7.6 23 24.7 23 5.1.1 10.1-.8 14.9-2.6v-10.8c-4.4 1.4-9.4 2.8-14.4 2.8-6.8.1-11.5-2.2-12.7-8.6zm9.8-17.7c3.6 0 6.5 2.4 6.5 5.8 0 4.3-4.6 5.7-9.8 5.7-2.2 0-4.5-.2-6.7-.5.2-2.1.8-4.1 1.8-6 1.6-3.1 4.8-5 8.2-5z"></path>
          </g>
          <g fill="#0052cc" transform="translate(94)">
            <path d="m98.9 16.7c0-4-2.6-5.8-7.4-7-3-.8-3.7-1.4-3.7-2.4 0-1.2 1.1-1.8 3.1-1.8 2.4.1 4.8.7 7 1.8v-5c-2.1-1-4.5-1.5-6.8-1.5-5.3 0-8.2 2.5-8.2 6.6 0 3.9 2.6 5.9 7 6.9 3.1.7 4 1.2 4 2.5 0 1-.7 1.8-3 1.8-2.8-.1-5.6-.9-8.1-2.3v5.3c2.5 1.2 5.2 1.9 8 1.9 5.4 0 8.1-2.7 8.1-6.8z"></path>
            <path d="m159.3 1.2v22h4.7v-16.8l2 4.4 6.6 12.3h5.9v-22h-4.7v14.2l-1.8-4.1-5.3-10.1h-7.4z"></path>
            <path d="m129.6 1.2h-5.1v22h5.1z"></path>
            <path d="m43.2 1.2v22h10.5l1.6-4.8h-7v-17.2z"></path>
            <path d="m22.4 1.2v4.8h5.7v17.2h5.1v-17.2h6.1v-4.8z"></path>
            <path d="m15 1.2h-6.7l-7.7 22h5.9l1.1-3.7c1.3.4 2.7.6 4.1.6s2.8-.2 4.1-.6l1.1 3.7h5.9zm-3.4 14.3c-1 0-1.9-.1-2.8-.4l2.8-9.6 2.8 9.6c-.9.3-1.8.4-2.8.4z"></path>
            <path d="m71.7 1.2h-6.7l-7.7 22h5.9l1.1-3.7c1.3.4 2.7.6 4.1.6s2.8-.2 4.1-.6l1.1 3.7h5.9zm-3.3 14.3c-1 0-1.9-.1-2.8-.4l2.8-9.6 2.8 9.6c-.9.3-1.9.4-2.8.4z"></path>
            <path d="m148 1.2h-6.7l-7.7 22h5.9l1.1-3.7c1.3.4 2.7.6 4.1.6s2.8-.2 4.1-.6l1.1 3.7h5.9zm-3.4 14.3c-1 0-1.9-.1-2.8-.4l2.8-9.6 2.8 9.6c-.9.3-1.8.4-2.8.4z"></path>
            <path d="m119.2 16.7c0-4-2.6-5.8-7.4-7-3-.8-3.7-1.4-3.7-2.4 0-1.2 1.1-1.8 3-1.8 2.4.1 4.8.7 7 1.8v-5c-2.2-1-4.5-1.5-6.9-1.5-5.3 0-8.2 2.5-8.2 6.6 0 3.9 2.6 5.9 7 6.9 3.1.7 4 1.2 4 2.5 0 1-.7 1.8-3 1.8-2.8-.1-5.6-.9-8.1-2.3v5.3c2.5 1.2 5.2 1.9 8 1.9 5.7 0 8.3-2.7 8.3-6.8z"></path>
          </g>
        </svg>
      </Link>
    </div>
  );
};

const NavBar = () => {
  // With useSession() => get access to current session.
  // provides access to status of authentication and data of the user.

  return (
    <header>
      <nav className=" text-white mb-5 md:mb-6 py-3 px-5 rounded-b-2xl bg-gradient-to-bl from-violet-400 to-indigo-500 md:py-3 ">
        <Flex justify={'between'} align={'center'} className=" md:px-3 ">
          <Flex align={'center'} gap={'5'}>
            <AppLogo />
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </nav>
    </header>
  );
};

export default NavBar;
