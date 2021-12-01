import { getProviders, signIn as Login } from "next-auth/client";
import FbIcon from "../../svg/FbIcon";
import GoogleIcon from "../../svg/GoogleIcon";
import { useRouter } from "next/router";
import { auth } from '../../../firebase';
import { useState } from "react";



function signin({ providers }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const simpleLogin = async ()=>{
    try {
      await auth.signInWithEmailAndPassword(email, pass).then(router.push("/"));
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <>
      <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 class="font-bold text-center text-2xl mb-5">Sign in</h1>
          <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div class="px-5 py-7 pb-2">
              <label class="font-semibold text-sm text-gray-600 pb-1 block">
                E-mail
              </label>
              <input
               value={email}
               onChange={(e)=> setEmail(e.target.value)}
                type="text"
                class="border border-black rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <label class="font-semibold text-sm text-gray-600 pb-1 block">
                Password
              </label>
              <input
              value={pass}
              onChange={(e)=> setPass(e.target.value)}

                type="text"
                class="border border-black rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <button
              onClick={()=> simpleLogin()}
                type="button"
                style={{ backgroundColor: "#00718b" }}
                class="transition duration-200  text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span class="inline-block mr-2">Login</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="w-4 h-4 inline-block"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
              <div className="w-full mt-6 flex justify-center flex-col items-center">
                {Object.values(providers).map((provider) => (
                  <div key={provider.name} className="w-full">
                    <button
                      className={`w-full relative ${
                        provider.name === "Google"
                          ? "bg-blue-500 text-white p-2 rounded-lg mb-4 "
                          : "bg-blue-900 text-white p-2 rounded-lg"
                      } `}
                      onClick={() => Login(provider.id, { callbackUrl: "/" })}
                    >
                      {provider.name === "Facebook" && <FbIcon />}
                      {provider.name === "Google" && <GoogleIcon />}
                      Sign in with {provider.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div class="py-2">
              <div class="">
                <div class="text-center sm:text-left whitespace-nowrap">
                  <button class="transition w-full duration-200 pb-2  cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <span onClick={()=>router.push("/auth/signup")} class="inline-block">Create account</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="py-2">
            <div class="grid grid-cols-2 gap-1">
              <div class="text-center sm:text-left whitespace-nowrap">
                <button class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-4 h-4 inline-block align-text-top"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  <span onClick={()=> router.push("/")} class="inline-block ml-1">Back to main page</span>
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
