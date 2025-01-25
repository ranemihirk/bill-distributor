"use client";

import { createUser } from "@/lib/redis";
import { useState } from "react";

export default function Create() {
  const [error, setError] = useState("");

  async function handleSubmit(formData) {
    const result = await createUser(formData);

    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <main>
      <form action={handleSubmit}>
        <h2>Add a New Book</h2>
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password" />
        <button type="submit" className="btn">
          Add Book
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </main>
  );
}
