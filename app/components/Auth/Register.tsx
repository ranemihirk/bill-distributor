"use client";
import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useToastContext } from "@/contexts/ToastContext";
import { signup } from "@/actions/auth";
import { createBook } from "@/lib/redis";
import Divider from "@mui/material/Divider";

type PopupProps = {
  handlePopupTypeChange: (newType) => void;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Register({
  handlePopupTypeChange,
  setOpen,
}: PopupProps) {
  const { loginUser } = useAuthContext();
  const { createToast, updateToast } = useToastContext();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(null);

  async function handleSubmit() {
    const toastId = createToast("Registering...", "info");
    if (nameRef.current && emailRef.current && passwordRef.current) {
      // Create a FormData object
      const formData = new FormData();
      formData.append("name", nameRef.current.value);
      formData.append("email", emailRef.current.value);
      formData.append("password", passwordRef.current.value);

      const result = await signup({}, formData);

      if (result?.errors) {
        setError(result.errors);
        updateToast("Something went wrong!", "error", toastId);
      }

      if (!result) {
        const response = await createBook(formData);
        console.log("response: ", response.message);
        if (response.error) {
          console.log(response.error, typeof response.error);
          setError(response.error);
          updateToast("Something went wrong!", "error", toastId);
          return;
        }

        if (response.message) {
          const userData = response.message.data;
          // if (userData.password.match(passwordRef.current.value)) {
          loginUser(userData);
          setOpen(false);
          console.log("Register Successful.");
          updateToast("Register Successful.", "success", toastId);
          // }
        }
      }
    }
  }

  return (
    <>
      <div className="shadow p-2 flex gap-2 flex-wrap">
        <div className="w-full text-center">
          <input
            id="name"
            name="name"
            type="text"
            ref={nameRef}
            placeholder="Name"
            className="w-full shadow p-2"
          />
          <div className="w-full">
            {error &&
              typeof error != "string" &&
              error.name.length > 0 &&
              error.name.map((name, key) => (
                <label
                  className="text-sm text-red block"
                  key={`name_${key}`}
                  htmlFor="name"
                >
                  {name}
                </label>
              ))}
          </div>
        </div>

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
              typeof error != "string" &&
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
              typeof error != "string" &&
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
          {error && typeof error == "string" && (
            <label className="text-sm text-red block">{error}</label>
          )}
          <button
            className="border text-sm lg:text-lg border-light px-4 py-2 rounded-lg bg-dark/80 text-light hover:bg-light hover:text-dark hover:shadow hover:shadow-light transition-all font-bold"
            type="button"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="flex justify-center">
        <button
          className="border text-sm lg:text-lg border-light px-4 py-2 rounded-lg bg-dark/80 text-light hover:bg-light hover:text-dark hover:shadow hover:shadow-light transition-all font-bold"
          onClick={() => handlePopupTypeChange("login")}
        >
          Login
        </button>
      </div>
    </>
  );
}
