import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <main>
      <h1>The page is not found...</h1>
      <div>
        The page you requested does not exist. Return to main and try to find
        what you are looking for there.
      </div>
      <Link to="/home">To Main</Link>
    </main>
  );
}
