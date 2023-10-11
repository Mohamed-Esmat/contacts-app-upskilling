import { Link, useRouteError } from 'react-router-dom';

const ErrorElement = () => {
  const error = useRouteError();
  console.log(error);
  //  if (error.response.status === 404)

  return (
    <main className="grid min-h-[100vh] place-items-center px-8  w-full h-full bg-white">
      <div className="text-center">
        <p className="text-9xl font-semibold text-primary">500</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          failed to fetch the page
        </h1>
        <p className="mt-6 text-lg leading-7">
          Sorry, we couldn't fetch this page.
        </p>
        <div className="mt-10">
          <Link to="/" className="btn btn-secondary">
            {/* THIS SHOULD TAKE THE USER TO A BACKUP SITE */}
            go back home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ErrorElement;
