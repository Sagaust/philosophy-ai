"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function Profile() {
  const { data: session } = useSession();
  const [password, setPassword] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/change-password", {
        email: session.user.email,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <form onSubmit={handleChangePassword} className="space-y-4">
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}
