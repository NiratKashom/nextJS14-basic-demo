"use client";
import { useState, useEffect } from "react";

type Props = {
  params: {
    id: string;
  };
};

type User = {
  id: string;
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
};

async function getUserInfo(id: string) {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
  if (!res.ok) {
    throw new Error("Cannot fetch userInfo");
  }
  return res.json();
}

export default function Page({ params: { id } }: Props) {
  const [user, setUser] = useState<User | any>();

  const fetchUser = async () => {
    try {
      const userData = await getUserInfo(id);
      setUser(userData);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev: any) => ({ ...prev, [name]: String(value) }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/users/" + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (!res.ok) {
        throw new Error("Cannot update user");
      }
      const resData = await res.json();
      console.log("Form submitted successfully", resData);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      ID : {user?.id}
      <div>Name : {user?.name}</div>
      <form onSubmit={handleSubmit}>
        <input
          className="text-black"
          name="name"
          type="text"
          value={user?.name}
          onChange={handleChange}
        />
        <button className="ml-2 px-2 bg-blue-400">Update</button>
      </form>
    </div>
  );
}
