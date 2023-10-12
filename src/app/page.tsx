import Image from "next/image";
import Link from "next/link";
import WelcomePage from "./welcomepage/page";

export default function ConversaPage() {
  return (
    <>
      <WelcomePage />
      <header>Conversa</header>
      <p>Your Communication Friend Online</p>

      <footer>
        <h6>2023 Conversa</h6>
      </footer>
    </>
  );
}
