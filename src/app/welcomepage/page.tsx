import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-indigo-900 text-white">
      <main className="m-0 p-5">
        <h1 className="text-5xl font-bold mb-0 text-yellow-400 font-serif">
          Conversa
        </h1>
        <p className="text-s mb-4 italic">Your Communication Friend Online</p>
      </main>
      <section className="font-sans">
        <Image
          src="/ConversaImage.png"
          alt="ConversaImage"
          width={150}
          height={150}
          className="mb-6 mx-auto"
        />

        <h4 className="text-lg">How can we help you today?</h4>
        <nav>
          <ul className="mt-4 inline-flex text-base text-yellow-200">
            <li className="mb-2 mr-8">
              <Link
                href="/login"
                className="hover:text-orange-300 hover:underline"
              >
                Log me in
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="hover:text-orange-300 hover:underline"
              >
                I wanna register
              </Link>
            </li>
          </ul>
        </nav>
      </section>

      <footer className="mt-8">
        <h6 className="text-xs">&copy; 2023 Conversa</h6>
      </footer>
    </div>
  );
}
