"use client";
import { useFormState } from "react-dom";
import { login } from "./action";

function Page() {
  const initState: { message: string } = {
    message: "",
  };
  const [state, formAction] = useFormState(login, initState);

  return (
    <form action={formAction}>
      <div>
        Email <input type="text" name="email" className="text-black" />
      </div>
      <div>
        Password{" "}
        <input type="password" name="password" className="text-black" />
      </div>
      <div>Message : {state.message}</div>
      <button>Login</button>
    </form>
  );
}

export default Page;
