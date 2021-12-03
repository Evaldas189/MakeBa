import React, { Component, useEffect, useState } from "react";
import { auth, database } from "../../../../firebase";
import { useRouter } from "next/router";

const Hoc = Component => () => {

    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);

    // useEffect(() => {
    //     if (auth?.currentUser) {
    //       const userRef = database.ref(auth.currentUser.uid);
    //       userRef.on("value", (snapshot) => {
    //         snapshot.forEach((data) => {
    //           const role = data.val();
    //           if (role !== "admin") {
    //             router.push("/admin/login");
    //           } else {
    //             setIsAdmin(true);
    //           }
    //         });
    //       });
    //     } else {
    //       router.push("/admin/login");
    //     }
    //   }, []);

      useEffect(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            const userRef = database.ref(user.uid);
            userRef.on("value", (snapshot) => {
              snapshot.forEach((data) => {
                const role = data.val();
                console.log(role);
                if (role !== "admin") {
                  router.push("/admin/login");
                } else {
                  setIsAdmin(true);
                }
              });
            });
          } else {
            router.push("/admin/login");
            
          }
        });
      }, []);

    return (
      <>
        {isAdmin ? (
          <div>
            <Component></Component>
          </div>
        ) : router.pathname === '/admin/login' ?  <Component></Component> : null}
      </>
    );
}

export default Hoc
