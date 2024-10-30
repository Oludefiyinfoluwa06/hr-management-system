import Link from "next/link";

export default function Home() {
  return (
    <div>
      <nav className="flex items-center justify-between px-4 py-2">
        <p>KHR</p>
        <ul className="flex items-center justify-end gap-3">
          <li>
            <Link href="#">Home</Link>
          </li>
          <li>
            <Link href="/employer/login">Login</Link>
          </li>
          <li>
            <Link href="/employer/register">Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
