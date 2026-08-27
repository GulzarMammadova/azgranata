import Link from "next/link";

import { NAVIGATION } from "@/constants/navigation";

export default function Navigation() {
  return (
    <nav>
      <ul>
        {NAVIGATION.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}