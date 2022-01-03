import { useRouter } from "next/router";
import { getSession, signIn, signOut, useSession } from "next-auth/client";
import { db } from "../../firebase";
import moment from "moment";

function Account({ setOpenModal, orders }) {
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
              <div className="w-full flex justify-center items-center bg-gray-300">
                <p className="py-2 text-sm text-black font-semibold ">
                  {session.user.name}
                </p>
              </div>
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
                  signOut({
                    callbackUrl: `${window.location.origin}`
                  }), setOpenModal(false);
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
                onClick={() => {
                  router.push('/auth/signup'), setOpenModal(false);
                }}
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

