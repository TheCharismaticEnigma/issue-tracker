import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';

const NavBar = () => {
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
            <Link href={href} className="navLink">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
