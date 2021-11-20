import {
  XIcon
} from "@heroicons/react/outline";

function FIlter({setOpenFilter}) {
  const closeFilter = () => {
   setOpenFilter(false)
  };
  return (
    <div className="w-screen h-screen z-40 absolute top-0 bg-opacity-60 bg-black">
      <div className="h-screen w-4/6 absolute bg-red-900 top-0 left-0 z-50">
        <XIcon
          onClick={() => closeFilter()}
          className="absolute h-7 text-white top-2 right-2"
          style={{ marginTop: 1, marginRight: 1 }}
        />
        <div className="mt-14 w-full text-center">
          <label
            className="block text-white text-sm font-bold mb-2"
            for="username"
          >
            FILTERS
          </label>
        </div>
        <div className="mt-5 m-5">
          <label
            className="block text-white text-sm font-bold mb-2"
            for="username"
          >
            Keyword
          </label>
          <input
            className="shadow appearance-none border rounded w-full mt-1 py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Search"
          ></input>
        </div>
        <div className="mt-8 m-5">
          <label
            className="block text-white text-sm font-bold mb-2"
            for="username"
          >
            Price range (EUR)
          </label>
          <div className="flex flex-row">
            <input
              className="shadow m-2 ml-0 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Min"
            ></input>
            <input
              className="shadow m-2 mr-0 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Max"
            ></input>
          </div>
        </div>
        <div class="block mt-5 m-5">
          <span class="text-white text-sm font-bold">Sorting</span>
          <div class="mt-2">
            <div className="mb-2">
              <label class="inline-flex items-center text-white text-sm font-bold">
                <input
                  type="radio"
                  className="form-radio"
                  name="radio"
                  value="1"
                  checked
                />
                <span class="ml-3">Most expensive on top</span>
              </label>
            </div>
            <div className="mb-2">
              <label class="inline-flex items-center text-white text-sm font-bold">
                <input type="radio" class="form-radio" name="radio" value="2" />
                <span class="ml-3">Cheapest on top</span>
              </label>
            </div>
            <div className="mb-2">
              <label class="inline-flex items-center text-white text-sm font-bold">
                <input type="radio" class="form-radio" name="radio" value="3" />
                <span class="ml-3">Latest at the top</span>
              </label>
            </div>
            <div>
              <label class="inline-flex items-center text-white text-sm font-bold">
                <input type="radio" class="form-radio" name="radio" value="3" />
                <span class="ml-3">Latest at the bottom</span>
              </label>
            </div>
          </div>
          <button
          
          className="mt-8 text-black font-bold w-full border border-black shadow-md flex flex-row justify-center items-center bg-white p-1 rounded-md"
        >
          Reset
        </button>
          <button
          
            className="mt-4 text-red-500 font-bold w-full border border-black shadow-md flex flex-row justify-center items-center bg-white p-1 rounded-md"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

export default FIlter
