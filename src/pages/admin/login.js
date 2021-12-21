import { useEffect, useState } from "react";
import { auth } from '../../../firebase';
import { signIn } from "next-auth/client";
import { database } from '../../../firebase';
import { useRouter } from "next/router";
import Hoc from './components/Hoc'


function login() {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const router = useRouter();

    useEffect(() => {
     if (auth?.currentUser) {
       const userRef = database.ref(auth.currentUser.uid);
       userRef.on("value", (snapshot) => {
         snapshot.forEach((data) => {
           const role = data.val();
           if (role !== "admin") {
             router.push("/admin/login");
           } else {
            router.push("/admin/products");
           }
         });
       });
     }else{
      router.push("/admin/login");
     }
    }, [])

    const adminLogin = () => {
      auth
        .signInWithEmailAndPassword(email, pass)
        .then((user) => {
          const userRef = database.ref(user.user.uid);
          userRef.on("value", (snapshot) => {
            snapshot.forEach((data) => {
              const role = data.val();
              if (role === "admin") {
                router.push("/admin/products");
              } else {
                router.push("/admin/login");
              }
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return (
      <div className="bg-white w-full h-screen justify-center items-center shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <div className="mb-4 w-5/12">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            for="Email"
          >
            Email
          </label>
          <input spellcheck="false" 
            className="shadow appearance-none border border-black rounded w-full py-2 px-3 text-grey-darker"
            id="Email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6 w-5/12">
          <label
            className="block text-grey-darker text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input spellcheck="false" 
            className="shadow appearance-none border border-black border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            id="password"
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between w-5/12">
          <button onClick={()=> adminLogin()}
            className="bg-blue-300 hover:bg-blue-dark text-black font-bold py-2 px-4 rounded"
            type="button"
          >
            Sign In
          </button>
          
        </div>
      </div>
    );
}

export default Hoc(login)
