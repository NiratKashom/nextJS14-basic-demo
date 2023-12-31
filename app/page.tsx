import Link from "next/link";
type Props = {};

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    throw new Error("Cannot fetch users");
  }
  return res.json();
}

export default async function Page({}: Props) {
  const users: User[] = await getUsers();
  return (
    <div>
      User List:
      {users.map((user, idx) => (
        <div key={idx}>
          {user.id} - {user.name}
          <Link href={`/user/${user.id}`} className="ml-2 px-2 bg-blue-400">
            User info
          </Link>
        </div>
      ))}
    </div>
  );
}
