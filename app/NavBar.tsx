'use client';

import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Box } from '@radix-ui/themes';

const NavBar = () => {
  const currentPath = usePathname();
  const { data: session, status } = useSession();

  // With useSession() => get access to current session.
  // provides access to status of authentication and data of the user.

  const linkColor = (href: string) => {
    // Looks up currentPath variable in the scope chain.
    return href === currentPath ? 'text-blue-400' : 'white';
  };

  const navLinks = [
    { label: 'Dashboard', href: '/' },
    { label: 'Issues', href: '/issues' },
  ];

  return (
    <nav className=" text-white border-b mb-5 flex space-x-5 items-center px-5 h-14 ">
      <Link href="/">
        <AiFillBug />
      </Link>

      <ul className="flex space-x-6">
        {navLinks.map(({ label, href }) => (
          <li key={label}>
            <Link href={href} className={`${linkColor(href)} navLink  `}>
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <Box>
        {status === 'authenticated' && (
          <Link href="/api/auth/signout" className="navLink">
            Logout
          </Link>
        )}

        {status === 'unauthenticated' && (
          <Link href="/api/auth/signin" className="navLink">
            Login
          </Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
