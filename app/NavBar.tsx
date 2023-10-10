'use client';

import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';
import { usePathname } from 'next/navigation';

const NavBar = () => {
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
    <nav className=" text-white border-b mb-5 flex space-x-5 items-center px-5 h-14 ">
      <Link href="/">
        <AiFillBug />
      </Link>

      <ul className="flex space-x-6">
        {navLinks.map(({ label, href }) => (
          <li key={label}>
            <Link href={href} className={`${linkColor(href)} navLink`}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
