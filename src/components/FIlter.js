import {
  XIcon
} from "@heroicons/react/outline";

function FIlter({setOpenFilter}) {
  const closeFilter = () => {
   setOpenFilter(false)
  };
  return (
    <div className=" w-screen h-screen z-40 absolute top-0 bg-opacity-60 bg-black">
      <div className="h-screen w-4/6 absolute bg-yellow-50 top-0 left-0 z-50">
        <XIcon
          onClick={() => closeFilter()}
          className="absolute h-7 text-black top-2 right-2"
          style={{ marginTop: 1, marginRight: 1 }}
        />
      </div>
    </div>
  );
}

export default FIlter
