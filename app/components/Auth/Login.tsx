"use client";
import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { signin } from "@/actions/auth";
import { fetchBook } from "@/lib/redis";
import Divider from "@mui/material/Divider";

type PopupProps = {
  handlePopupTypeChange: (newType) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Login({ handlePopupTypeChange, setOpen }: PopupProps) {
  const { loginUser } = useAuthContext();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(null);

  async function handleSubmit() {
    if (emailRef.current && passwordRef.current) {
      // Create a FormData object
      const formData = new FormData();
      formData.append("email", emailRef.current.value);
      formData.append("password", passwordRef.current.value);

      const result = await signin({}, formData);

      if (result?.errors) {
        setError(result.errors);
      }

      if (!result) {
        const response = await fetchBook(emailRef.current.value);
        
        if(response.error){
          console.log(response.error);
          return;
        }

        if (response.message) {
          const userData = response.message.data;
          if (userData.password.match(passwordRef.current.value)) {
            loginUser(userData);
            setOpen(false);
            console.log("Login Successful.");
          }
        }
      }
    }
  }

  return (
    <>
      <div className="shadow p-2 flex gap-2 flex-wrap">
        <div className="w-full text-center">
          <input
            id="email"
            name="email"
            type="email"
            ref={emailRef}
            placeholder="Email"
            className="w-full shadow p-2"
          />
          <div className="w-full">
            {error &&
              error.email.length > 0 &&
              error.email.map((email, key) => (
                <label
                  className="text-sm text-red block"
                  key={`email_${key}`}
                  htmlFor="email"
                >
                  {email}
                </label>
              ))}
          </div>
        </div>

        <div className="w-full text-center">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            ref={passwordRef}
            className="w-full shadow p-2"
          />
          <div>
            {error &&
              error.password.length > 0 &&
              error.password.map((password, key) => (
                <label
                  className="text-sm text-red block"
                  key={`password_${key}`}
                  htmlFor="password"
                >
                  {password}
                </label>
              ))}
          </div>
        </div>
        <div className="w-full text-center">
          {" "}
          <button
            className="border text-sm lg:text-lg border-light px-4 py-2 rounded-lg bg-dark/80 text-light hover:bg-light hover:text-dark hover:shadow hover:shadow-light transition-all font-bold"
            type="button"
            onClick={handleSubmit}
          >
            Sign In
          </button>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="flex justify-center">
        <button
          className="border text-sm lg:text-lg border-light px-4 py-2 rounded-lg bg-dark/80 text-light hover:bg-light hover:text-dark hover:shadow hover:shadow-light transition-all font-bold"
          onClick={() => handlePopupTypeChange("register")}
        >
          Register
        </button>
      </div>
    </>
  );
}
