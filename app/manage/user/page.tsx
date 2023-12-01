import { headers } from "next/headers";
import Link from "next/link";

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
export default async function Page() {
  const headerRequest = headers();
  const user = JSON.parse(headerRequest.get("user") || "{}");
  const users: User[] = await getUsers();
  return (
    <div>
      Manage User
      <div>{user.email}</div>
      <div>
      User List:
      {users.map((user, idx) => (
        <div key={idx}>
          {user.id} - {user.name}
          <Link href={`/manage/user/${user.id}`} className="ml-2 px-2 bg-blue-400">
            edit user
          </Link>
        </div>
      ))}
    </div>
    </div>
  );
}
