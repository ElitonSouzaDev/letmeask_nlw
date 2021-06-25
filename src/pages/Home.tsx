import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";
import "../styles/auth.scss";
import { Button } from "../components/Button";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";
import { useTheme } from "../hooks/useTheme";
import Toggle from "../components/Toggle";
import toast from "react-hot-toast";

export function Home() {
  //quando inicia com use é um hook do react...
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const { currentTheme, toggleTheme } = useTheme();
  const [roomCode, setRoomCode] = useState("");

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    if (!roomRef.exists()) {
      toast.error("Sala não existe !");
      return;
    }

    if (roomRef.val().endedAt) {
      toast.error("Sala já foi encerrada :(");
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }
  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }

    history.push("/rooms/new");
  }

  return (
    <div id="page-auth" className={currentTheme}>
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
        <Toggle currentTheme={currentTheme} toggleTheme={toggleTheme} />
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={(event) => handleJoinRoom(event)}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
