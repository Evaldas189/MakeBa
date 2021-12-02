import { useState } from "react";
import { auth } from '../../../firebase';
import { signIn } from "next-auth/client";
import { database } from '../../../firebase';
import { useRouter } from "next/router";


function login() {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const router = useRouter();

    const adminLogin = () => {
      console.log("a")
        auth
        .signInWithEmailAndPassword(email, pass)
        .then((user) => {
          console.log("asdasd")
          const userRef = database.ref(user.user.uid);
          userRef.on("value", (snapshot) => {
            snapshot.forEach(data => {
              const role = data.val();
              if(role === "admin"){
                signIn("credentials", {
                  email,
                  pass,
                  role: "admin",
                  redirect: false,
                }).then(()=> router.push("/admin/admin"));
              }
            })
          });
          
        })
        .catch((error) => { console.log(error) });
    }

    return (
      <div class="bg-white w-full h-screen justify-center items-center shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div class="mb-4 w-5/12">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="Email"
          >
            Email
          </label>
          <input
            class="shadow appearance-none border border-black rounded w-full py-2 px-3 text-grey-darker"
            id="Email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="mb-6 w-5/12">
          <label
            class="block text-grey-darker text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            class="shadow appearance-none border border-black border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <div class="flex items-center justify-between w-5/12">
          <button onClick={()=> adminLogin()}
            class="bg-blue-300 hover:bg-blue-dark text-black font-bold py-2 px-4 rounded"
            type="button"
          >
            Sign In
          </button>
          
        </div>
      </div>
    );
}

export default login
