import React from "react";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <>
      <main>
        <h1>Welcome to Conversa</h1>
        <p>Your Communication Friend Online</p>
      </main>
      <section>
        <h4>How can we help you today?</h4>
        <nav>
          <ul>
            <li>
              <Link href="/login">Log me in</Link>
            </li>
            <li>
              <Link href="/signup">I wanna register</Link>
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
}
