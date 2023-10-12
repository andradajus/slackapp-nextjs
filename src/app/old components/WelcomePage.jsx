import Link from "next/link";

const WelcomePage = () => {
  return (
    <div className="flex flex-col text-center">
      <h1 className="text-center">Welcome to Slack-like App</h1>
      <h4 className="text-center">How can we help you today?</h4>
      <nav>
        <ul>
          <li className="welcomeOptions">
            <Link href="/login">Log me in</Link>
          </li>
          <li className="welcomeOptions">
            <Link href="/signup">I wanna register</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default WelcomePage;
