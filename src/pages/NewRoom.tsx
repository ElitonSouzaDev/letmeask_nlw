import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import '../styles/auth.scss';
import { Button } from "../components/Button";
import { Link, useHistory } from "react-router-dom";
import { FormEvent, useState } from 'react';
import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import Toggle from "../components/Toggle";

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom ] = useState('');
  const { currentTheme, toggleTheme } = useTheme();

  async function handleCreateRoom(event:FormEvent) {
    event.preventDefault();
    if (newRoom.trim() === '') {
      return;
    }

    //reference é tipo um id de um registro do banco
    const roomRef = database.ref('rooms');
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    });

    history.push(`/rooms/${firebaseRoom.key}`);

  }
  
  return (
    <div id="page-auth" className={currentTheme}>
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
        <Toggle currentTheme={currentTheme} toggleTheme={toggleTheme} />
      </aside>
      <main>
          <div className="main-content">
              <img src={logoImg} alt="Letmeask"/>
              <h2>Criar uma nova sala</h2>
              <form onSubmit={handleCreateRoom}>
                  <input 
                  type="text" 
                  placeholder="Nome da Sala"
                  onChange={event => setNewRoom(event.target.value)}
                  value={newRoom}
                  />
                  <Button type="submit">
                      Criar Sala
                  </Button>
              </form>
              <p>Quer entrar em uma sala existente ? <Link to="/"><a href="/">clique aqui</a></Link></p>
          </div>
      </main>
    </div>
  );
}
