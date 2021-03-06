import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { RoomCode } from "../components/RoomCode";
import { useParams, useHistory } from "react-router-dom";
import "../styles/room.scss";
import { useTheme } from "../hooks/useTheme";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";
import { Button } from "../components/Button";
import { database } from "../services/firebase";
import { Logo } from "../components/Logo";
import Toggle from "../components/Toggle";

type RoomParams = {
  id: string;
};


export function AdminRoom() {
  const params = useParams<RoomParams>();
  const RoomID = params.id;
  const { questions, title } = useRoom(RoomID);
  const { currentTheme, toggleTheme } = useTheme();
  const history = useHistory();

  async function handleEndRoom() {
    await database.ref(`rooms/${RoomID}`).update({
      endedAt: new Date(),
    });
    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Deseja realmente excluir essa pergunta ? ")) {
      await database.ref(`rooms/${RoomID}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${RoomID}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${RoomID}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="pageRoom" className={currentTheme}>
      <header>
        <div className="content">
        <div className='teste'>
            <Logo />
            <Toggle currentTheme={currentTheme} toggleTheme={toggleTheme} />
          </div>
          <div>
            <RoomCode code={RoomID} />
            <Button title='Encerrar sala' isOutlined type="button" onClick={handleEndRoom}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            </Button>
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
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  {!question.isAnswered && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          handleCheckQuestionAsAnswered(question.id)
                        }
                      >
                        <img
                          src={checkImg}
                          alt="Marcar pergunta como respondida"
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleHighlightQuestion(question.id)}
                      >
                        <img src={answerImg} alt="Destacar pergunta" />
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
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
