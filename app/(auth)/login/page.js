"use client";

import {
  useState
} from "react";

export default function LoginPage() {

  const [email, setEmail] =
  useState("");

  const [password,
    setPassword] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const handleLogin =
  async () => {

    try {

      setLoading(true);

      const response =
      await fetch(

        "http://localhost:4000/api/investors/login",

        {
          method: "POST",

          headers: {
            "Content-Type":
            "application/json"
          },

          body: JSON.stringify({

            email,
            password

          }),
        }
      );

      const result =
      await response.json();

      console.log(result);

      if(result.success){

        // STORE TOKEN
        localStorage.setItem(
          "token",
          result.token
        );

        alert("Login Successful");

        // REDIRECT
        window.location.href =
        "/dashboard";
      }
      else{

        alert(
          result.message
        );
      }

    } catch(error){

      console.log(error);

      alert(
        "Login Failed"
      );
    }

    setLoading(false);
  };

  return (

    <div className="h-screen flex items-center justify-center bg-[#ecebf3]">

      <div className="w-[400px] bg-white p-10 rounded-3xl shadow-xl">

        <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">

          KFin Wings

        </h1>

        <div className="flex flex-col gap-5">

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="border border-gray-300 rounded-xl px-4 py-3 outline-none"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="border border-gray-300 rounded-xl px-4 py-3 outline-none"
          />

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-purple-700 text-white py-3 rounded-xl font-bold hover:bg-purple-800 transition-all"
          >

            {
              loading
              ? "Logging In..."
              : "Login"
            }

          </button>

        </div>

      </div>

    </div>
  );
}