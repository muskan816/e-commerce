import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="min-h-[50vh] flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <h2 className="text-2xl font-semibold mt-4 text-gray-700">
        Uh oh! You're lost.
      </h2>
      <p className="mt-4 text-gray-500 max-w-md">
          Looks like the page you're searching for has wandered off. Let's get you back to something familiar.
      </p>
      <NavLink
        to="/"
        className="mt-6 inline-block bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
      >
        Home
      </NavLink>
    </section>
  );
};

export default ErrorPage;
