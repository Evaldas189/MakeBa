import { useRouter } from "next/router";
import { signIn, sendEmailVerification } from "next-auth/client";
import { auth, database } from '../../../firebase';
import { useState } from "react";

function signup() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [passConfirm, setPassConfirm] = useState("");
    const [error, setError] = useState("")
    const [showEmailMessage, setShowEmailMessage] = useState(false)


    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const isValid = () => {
      if (pass === "" || passConfirm === "" || email === "") {
        setError("Fill all the fields");
      } else if (validateEmail(email) === null) {
        setError("Invalid email address");
      } else if (pass !== passConfirm) {
        setError("passwords do not match");
      } else{
        return true
      }
    };

    const createUser = () => {
      if(isValid() === true){
      auth.createUserWithEmailAndPassword(email, pass)
        .then((userCredential) => {
          setError("")
          userCredential.user.sendEmailVerification().then(() => {
            database.ref(userCredential.user.uid).set({
              role: "user"
            }).catch(alert);
            setEmail("");
            setPass("");
            setPassConfirm("");
            setShowEmailMessage(true)
          });
        })
        .catch((error) => {
            setError(error.message)
        });
      }
    };

  return (
    <>
      <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 class="font-bold text-center text-2xl mb-5">Sign up</h1>
          <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div class="px-5 py-7 pb-2">
              <label class="font-semibold text-sm text-gray-600 pb-1 block">
                E-mail
              </label>
              <input
                type="text"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}

                class="border border-black rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <label class="font-semibold text-sm text-gray-600 pb-1 block">
                Password
              </label>
              <input
              value={pass}
              onChange={(e)=> setPass(e.target.value)}

                type="password"
                class="border border-black rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <label class="font-semibold text-sm text-gray-600 pb-1 block">
                Repeat password
              </label>
              <input
                value={passConfirm}
                type="password"
                onChange={(e)=> setPassConfirm(e.target.value)}
                class={`border border-black rounded-lg px-3 py-2 mt-1 ${error !== "" || showEmailMessage ? "mb-2" : "mb-5"} text-sm w-full`}
              />
              {error !== "" && <label class="text-center text-xs text-red-600 pb-2 block">{error}</label>}
              {error === "" && showEmailMessage &&
               <div class="text-center rounded-md p-2 bg-green-500 text-xs text-white mb-2 mr-0 ml-0 block">A verification link has been sent to your email account. Click on the link to verify your email and continue by signing in.</div>}

              <button
                type="button"
                onClick={()=>createUser()}
                style={{ backgroundColor: "#00718b" }}
                class="transition duration-200 active:text-yellow-500 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span class="inline-block mr-2">Create account</span>
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
            </div>
            <div class="py-2">
              <div class="">
                <div class="text-center sm:text-left whitespace-nowrap">
                  <button class="transition w-full duration-200 pb-2  cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <span onClick={()=>signIn()} class="inline-block">Already have an account?</span>
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

export default signup;