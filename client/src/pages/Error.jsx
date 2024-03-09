import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <section className="container">
      <div className="row justify-content-center mt-5 p-4">
        <div className="col-md-6 text-center">
          <img
            src="https://placekitten.com/400/300"
            alt="Page Not Found"
            className="img-fluid"
          />
          <h1 className="mt-4">Uh oh, something went wrong!</h1>
          <p className="lead mt-4">
            <i>{error.statusText || error.message}</i>
          </p>
          <a class="btn btn-primary" href="/" role="button">
            Go Home!
          </a>
        </div>
      </div>
    </section>
  );
}
