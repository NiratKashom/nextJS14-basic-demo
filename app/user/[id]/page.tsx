import React from "react";

type Props = {
  params: {
    id: string;
  };
};

type User = {
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
};

async function getUserInfo(id: string) {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
  if (!res.ok) {
    throw new Error("Cannot fetch userInfo");
  }
  return res.json();
}

async function Page({ params: { id } }: Props) {
  const user: User = await getUserInfo(id);
  return (
    <div>
      ID : {user.id}
      <div>Name : {user.name}</div>
      <div>Email : {user.email}</div>
      <div>
        Address : {user.address.street}, {user.address.suite},{" "}
        {user.address.city}, {user.address.zipcode}
      </div>{" "}
    </div>
  );
}

export default Page;
