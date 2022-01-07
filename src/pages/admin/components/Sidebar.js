import { useRouter } from "next/router";
import { auth } from "../../../../firebase";


function Sidebar({selected}) {
    
    const router = useRouter();

    return (
      <div className="md:flex flex-col md:flex-row md:min-h-screen w-3/12 border-r">
        <div
          className="flex flex-col w-full md:w-64 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0"
        >
          <div className="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
            <a
              className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
            >
              Makeba
            </a>
           
          </div>
          <nav className="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto">
            <a
              onClick={()=>router.push("/admin/products")}
              className={`block cursor-pointer px-4 py-2 mt-2 text-sm font-semibold text-gray-900 ${selected === "products" ? "bg-gray-200" : "bg-transparent"} rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline`}
            >
              Products
            </a>
            <a
              onClick={()=>router.push("/admin/orders")}
              className={`block cursor-pointer px-4 py-2 mt-2 text-sm font-semibold text-gray-900 ${selected === "orders" ? "bg-gray-200" : "bg-transparent"} rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline`}
            >
              Orders
            </a>
            <a
              onClick={()=>auth.signOut().then(router.push("/admin/login"))}
              className={`block cursor-pointer px-4 py-2 mt-4 text-sm font-semibold text-gray-900 rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline`}
            >
              Log out
            </a>
           
          </nav>
        </div>
      </div>
    );
}

export default Sidebar
