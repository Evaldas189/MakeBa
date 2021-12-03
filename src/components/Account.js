import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/client";

function Account({ setOpenModal }) {
  const router = useRouter();
  const [session] = useSession();

  return (
    <div
      style={{ marginTop: 4, marginLeft: 2 }}
      className={`absolute top-8 right-0 z-50`}
    >
      <div className="relative ">
        <div
          onClick={() => setOpenModal(false)}
          x-show="dropdownOpen"
          className="fixed inset-0 h-full w-full z-10"
        ></div>

        <div
          x-show="dropdownOpen"
          className="absolute right-0 w-48 bg-white rounded-md shadow-xl z-20"
        >
          {session ? (
            <>
              <a
                onClick={() => {
                  setOpenModal(false);
                  router.push({
                    pathname: "/orders",
                  });
                }}
                className="cursor-pointer hover:text-yellow-500 block px-4 py-2 text-sm capitalize text-gray-700"
              >
                Orders
              </a>

              <a
                onClick={() => {
                  signOut(), setOpenModal(false);
                }}
                className="cursor-pointer hover:text-yellow-500 block px-4 py-2 text-sm capitalize text-gray-700 "
              >
                Sign Out
              </a>
            </>
          ) : (
            <>
              <a
                onClick={() => {
                    signIn(), setOpenModal(false);
                  }}
                className="cursor-pointer hover:text-yellow-500 block px-4 py-2 text-sm capitalize text-gray-700"
              >
                Log In
              </a>

              <a
                // onClick={() => {
                //   signOut(), setOpenModal(false);
                // }}
                className="cursor-pointer hover:text-yellow-500 block px-4 py-2 text-sm capitalize text-gray-700 "
              >
                Register
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;