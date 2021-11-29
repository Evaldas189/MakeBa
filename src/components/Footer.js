import {
    LocationMarkerIcon,
    MailIcon,
    PhoneIcon
  } from "@heroicons/react/outline";

function Footer() {
    return (
      <div style={{backgroundColor: "#e7b80e"}} className="w-full">
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="h-8 cursor-pointer w-full text-center text-white"
        >
          <p className="pt-1 text-black font-bold active:text-white hover:text-white">Go back to top</p>
        </div>
        <div style={{backgroundColor: "#0987a3"}} className="w-full items-center flex flex-col sm:flex-row text-white">
          <div className="w-4/6 mt-4 sm:mt-0 sm:2-3/6 h-full flex justify-center items-center">
            <div className=" flex-col text-left">
              <div className="flex flex-row items-center p-1">
                <LocationMarkerIcon className=" h-5 pr-1" />
                <p>Verkiu str. 45, Vilnius, LT-51354</p>
              </div>
              <div className="flex flex-row items-center p-1">
                <MailIcon className=" h-5 pr-1" />
                <p>Info@makeba.com</p>
              </div>
              <div className="flex flex-row items-center p-1">
                <PhoneIcon className=" h-5 pr-1" />
                <p>+370672287334</p>
              </div>
            </div>
          </div>
          <div className="w-4/6 sm:2-3/6 h-full">
              <form class=" px-2 sm:px-24 sm:pl-14 pl-2 pt-6 pb-8 mb-4">
                <div class="mb-4">
                  <label
                    class="block text-white text-lg font-bold mb-2"
                    for="username"
                  >
                    Contact Us
                  </label>
                  <input
                    class="shadow max-w-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Email address"
                  />
                </div>
               
                <div class="flex items-center justify-between">
                  <button
                  style={{backgroundColor: "#e7b80e", borderWidth:1, borderColor: "black"}}
                    class=" text-black hover:text-white active:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Send
                  </button>
                 
                </div>
              </form>
            </div>
          </div>
      </div>
    );
}

export default Footer
