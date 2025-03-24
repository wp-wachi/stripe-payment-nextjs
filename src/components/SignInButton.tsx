import { useSession, signIn, signOut } from "next-auth/react";

export const SignInButton = () => {
  const { data } = useSession();

  if (!data?.accessToken) {
    <button
      onClick={() => signIn("google")}
      className="bg-blue-500 text-white px-4 py-2 mt-4"
    >
      Sign in with Google
    </button>;
  }

  return (
    <div className="p-4">
      <button
        onClick={() => signOut()}
        className="bg-gray-500 text-white px-4 py-2 mt-4"
      >
        Sign out
      </button>
    </div>
  );
};
