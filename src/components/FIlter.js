import {
  XIcon
} from "@heroicons/react/outline";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { applyFilter, resetFilter } from "../slices/filterSlice";
import { selectFilter } from "../slices/filterSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function FIlter({setOpenFilter}) {

  const dispatch = useDispatch();
  const basketFilter = useSelector(selectFilter);
  const router = useRouter();
  const [filter, setFilter] = useState(
    {keyword: basketFilter.keyword, minValue: basketFilter.minValue, maxValue: basketFilter.maxValue, sort: basketFilter.sort})

  const closeFilter = () => {
    setOpenFilter(false);
  };
  const removeFilter = () => {
    dispatch(resetFilter())
    setFilter({keyword: "", minValue: "", maxValue: "", sort: ""})
  };

  const onFilterChange = (key, value) => {
  
    dispatch(
      applyFilter({key,value})
    );
    let newFilter = {...filter};
    newFilter[key] = value
    setFilter(newFilter);
  };

  return (
    <div className="w-full h-screen z-50 fixed top-0 bg-opacity-60 bg-black">
      <div className="h-screen w-4/6 sm:w-2/4 md:w-2/4 lg:w-1/5 absolute filter-container top-0 left-0 z-50">
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
          >
            Keyword
          </label>
          <input spellcheck="false" 
            spellcheck="false"
            className="shadow appearance-none border rounded w-full mt-1 py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Search"
            value={filter.keyword}
            onChange={(e)=>onFilterChange("keyword", e.target.value)}
          ></input>
        </div>
        <div className="mt-8 m-5">
          <label
            className="block text-white text-sm font-bold mb-2"
          >
            Price range (EUR)
          </label>
          <div className="flex flex-row">
            <input spellcheck="false" 
              className="shadow m-2 ml-0 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Min"
              value={filter.minValue}
              onChange={(e)=>onFilterChange("minValue", e.target.value)}
            ></input>
            <input spellcheck="false" 
              className="shadow m-2 mr-0 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              placeholder="Max"
              value={filter.maxValue}
              onChange={(e)=>onFilterChange("maxValue", e.target.value)}
            ></input>
          </div>
        </div>
        <div className="block mt-5 m-5">
          <span className="text-white text-sm font-bold">Sorting</span>
          <div className="mt-2">
            <div className="mb-2">
              <label className="inline-flex items-center text-white text-sm font-bold">
                <input spellcheck="false" 
                  type="radio"
                  className="form-radio"
                  name="radio"
                  value="1"
                  defaultChecked
                  onChange={(e)=> onFilterChange("sort", e.target.value)}
                />
                <span className="ml-3">Latest at the top</span>
              </label>
            </div>
            <div className="mb-2">
              <label className="inline-flex items-center text-white text-sm font-bold">
                <input spellcheck="false"  type="radio" checked={filter.sort === "2"} className="form-radio" name="radio" value="2" onChange={(e)=> onFilterChange("sort", e.target.value)} />
                <span className="ml-3">Cheapest on top </span>
              </label>
            </div>
            <div className="mb-2">
              <label className="inline-flex items-center text-white text-sm font-bold">
                <input spellcheck="false"  type="radio" checked={filter.sort === "3"} className="form-radio" name="radio" value="3" onChange={(e)=> onFilterChange("sort", e.target.value)} />
                <span className="ml-3">Most expensive on top </span>
              </label>
            </div>
            <div>
              <label className="inline-flex items-center text-white text-sm font-bold">
                <input spellcheck="false"  type="radio" checked={filter.sort === "4"} className="form-radio" name="radio" value="4" onChange={(e)=> onFilterChange("sort", e.target.value)} />
                <span className="ml-3">Latest at the bottom</span>
              </label>
            </div>
          </div>
          <button
          onClick={()=>removeFilter()}
          className="mt-8 text-black font-bold w-full border border-black shadow-md flex flex-row justify-center items-center bg-white p-1 rounded-md"
        >
          Reset
        </button>
        <button
          onClick={()=>closeFilter()}
          style={{backgroundColor: '#3b3d45'}}
          className="mt-4 text-white font-bold w-full border border-white shadow-md flex flex-row justify-center items-center p-1 rounded-md"
        >
          OK
        </button>
        </div>
      </div>
      <div onClick={()=> closeFilter()} className=" w-2/6 sm:w-2/4 md:w-2/4 lg:w-4/5 h-screen float-right">

      </div>
    </div>
  );
}

export default FIlter
