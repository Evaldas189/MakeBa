import { getProviders, signIn as Login, sendPasswordResetEmail } from "next-auth/client";
import FbIcon from "../../svg/FbIcon";
import GoogleIcon from "../../svg/GoogleIcon";
import { useRouter } from "next/router";
import { auth } from '../../../firebase';
import { useState } from "react";



function signin({ providers }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("")

  const userLogin = (provider) => {

    if (provider.name !== "Google" && provider.name !== "Facebook") {
      auth
        .signInWithEmailAndPassword(email, pass)
        .then((user) => {
          if (user.user.emailVerified === false) {
            setError("You need to verify your email");
          } else {
            setError("");
            Login("credentials", {
              email,
              pass,
              callbackUrl: "/",
            });
          }
        })
        .catch((error) => {
          setError("Wrong email or password");
        });
    } else {
      Login(provider.id, { callbackUrl: "/" });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 className="font-bold text-center text-2xl mb-5">Sign in</h1>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div className="px-5 py-7 pb-2">
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                E-mail
              </label>
              <input spellcheck="false" 
                value={email}
                autoComplete="new-password"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="border border-black rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <label className="font-semibold text-sm text-gray-600 pb-1 block">
                Password
              </label>
              <input spellcheck="false" 
                value={pass}
                autoComplete="new-password"
                placeholder="Password"
                onChange={(e) => setPass(e.target.value)}
                type="password"
                className={`border border-black rounded-lg px-3 py-2 mt-1 ${
                  error ? "mb-2" : "mb-5"
                } text-sm w-full`}
              />
              {error && (
                <label className="text-center text-xs text-red-600 pb-1 block">
                  {error}
                </label>
              )}

              <div className="w-full mt-2 flex justify-center flex-col items-center">
                {Object.values(providers).map((provider) => (
                  <div key={provider.name} className="w-full">
                    <button
                      className={`w-full relative ${
                        provider.name === "Google"
                          ? "bg-blue-500 text-white p-2 rounded-lg mb-4 "
                          : provider.name === "Facebook"
                          ? "bg-blue-900 text-white p-2 rounded-lg"
                          : "bg-yellow-500 active:text-black text-white p-2 mb-6 rounded-lg mb-2"
                      } `}
                      onClick={() => userLogin(provider)}
                    >
                      {provider.name === "Facebook" && <FbIcon />}
                      {provider.name === "Google" && <GoogleIcon />}
                      {provider.name !== "Credentials"
                        ? `Sign in with ${provider.name}`
                        : "Sign in"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="py-2">
              <div className="">
                <div className="text-center sm:text-left whitespace-nowrap">
                  <button onClick={() => router.push("/auth/signup")} className="transition w-full duration-200 pb-2  cursor-pointer font-normal text-sm rounded-lg text-gray-500 focus:text-yellow-500 hover:text-yellow-600">
                    <span
                      
                      className="inline-block"
                    >
                      Create account
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="py-2">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button onClick={() => router.push("/")} className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block align-text-top"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  <span
                    className="inline-block ml-1"
                  >
                    Back to main page
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default signin;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
