import React, { useState } from "react";
import { useRouter } from "next/router";
import { sendResetEmail } from "../firebase/firebase";
import Link from "next/link";

export default function ForgotPassword() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const resetPassword = (event) => {
    event.preventDefault();
    const email = document.querySelector("#email").value;

    sendResetEmail(email)
      .then(() => {
        setSuccessMessage(
          "Parola sıfırlama maili gönderildi lütfen mail adresinizi kontrol ediniz."
        );
        setError("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        setSuccessMessage("");
      });
  };

  return (
    <div className="h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="site-4xl-container w-full max-w-xs">
        <div className="pt-20">
          <form
            onSubmit={resetPassword}
            className="bg-white shadow-md rounded-xl px-8 pb-8 mb-4 mt-20 "
          >
            <div className="mb-4 pt-4 h-24">
              <label
                className="block text-center text-m font-bold mb-2 mt-3"
                htmlFor="username"
              >
                Şifremi Unuttum
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 mt-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Mevcut email adresiniz"
                required
                name="email"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline mb-4"
                type="submit"
              >
                Gönder
              </button>
            </div>
            <Link
              className="hover:underline underline-offset-2 font-bold text-sm"
              href="/login"
            >
              <i className="text-lg fa-solid fa-circle-chevron-left"></i>
              &nbsp;Giriş Yap
            </Link>
            <span className="text-green-600 text-sm">{successMessage}</span>
            <br></br>
            <span className="text-orange-700 text-sm">{error}</span>
          </form>
        </div>
      </div>
    </div>
  );
}
