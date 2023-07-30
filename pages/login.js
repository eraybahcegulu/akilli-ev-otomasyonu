import React, { useState } from "react";
import { useRouter } from "next/router";
import { signInEmailAndPassword } from "../firebase/firebase";
import Link from "next/link";
import { useAuth } from "../components/useAuth";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");

  const { pending, isSignedIn, user, auth } = useAuth();

  if (isSignedIn) {
    router.push("/panel");
  }

  const loginWithCredentials = (event) => {
    event.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    signInEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/panel");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return pending || isSignedIn ? (
    <span>Yükleniyor...</span>
  ) : (
    <div className="h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="site-4xl-container max-w-xs">
        <div className="pt-20">
          <form
            onSubmit={loginWithCredentials}
            className="bg-white shadow-md rounded-xl px-8 pt-2 pb-8 mb-4 mt-20"
          >
            <label className="text-center block  text-m font-bold mb-2 mt-2">
              Giriş Yap
            </label>

            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 mt-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email"
                required
                name="email"
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 mt-1 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Şifre"
                required
                name="password"
              />
            </div>
            <div className="flex items-center justify-between">
              <Link
                className="inline-block align-baseline text-sm text-red-500 mb-3 hover:underline underline-offset-2"
                href="/forgot-password"
              >
                Şifremi Hatırlamıyorum
              </Link>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-2 px-5 rounded-xl focus:outline-none focus:shadow-outline mb-4"
                type="submit"
              >
                Giriş
              </button>
            </div>
            <Link
              className="hover:underline underline-offset-2 font-bold text-sm"
              href="/"
            >
              <i className="text-lg fa-solid fa-circle-chevron-left"></i>
              &nbsp;Anasayfa
            </Link>
            <span className="text-orange-700 text-sm">{error}</span>
          </form>
        </div>
      </div>
    </div>
  );
}
