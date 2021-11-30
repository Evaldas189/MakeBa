import {getProviders, signIn as Login} from 'next-auth/client';



function signin({ providers }) {
  return (
    <>
      <div className='w-full h-screen flex justify-center flex-col items-center'>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button className={`${provider.name === "Google" ? "bg-blue-500 text-white p-2 rounded-lg mb-4 " : "bg-blue-900 text-white p-2 rounded-lg"} `} onClick={() => Login(provider.id, { callbackUrl: "/" })}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default signin

export async function getServerSideProps() {
    
  const providers = await getProviders();

  return {
      props: {
          providers,
      },
  }
}
