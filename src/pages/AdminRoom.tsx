import LogoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
import { RoomCode } from "../components/RoomCode";
import { useParams, useHistory } from "react-router-dom";
import "../styles/room.scss";
import { useTheme } from "../hooks/useTheme";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";
import { Button } from "../components/Button";
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const RoomID = params.id;
  const { questions, title } = useRoom(RoomID);
  const { currentTheme } = useTheme();
  const history = useHistory();

  async function handleEndRoom(){
    await database.ref(`rooms/${RoomID}`).update({
      endedAt: new Date()
    });
    history.push('/');
  }

  async function handleDeleteQuestion(questionId : string) {
    if (window.confirm('Deseja realmente excluir essa pergunta ? ')) {
      await database.ref(`rooms/${RoomID}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id="pageRoom" className={currentTheme}>
      <header>
        <div className="content">
          <img src={LogoImg} alt="LetMeAsk" />
          <div>
            <RoomCode code={RoomID} />
            <Button isOutlined
            type="button"
            onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} perguntas</span>}
        </div>

        {
          <div className="question-list">
            {questions.map((question) => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                >
                  <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}>
                    <img src={deleteImg} alt="Remover pergunta" />
                  </button>
                  </Question>
              );
            })}
          </div>
        }
      </main>
    </div>
  );
}
