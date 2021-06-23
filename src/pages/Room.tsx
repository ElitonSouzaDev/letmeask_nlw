import LogoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import '../styles/room.scss';

export function Room(){
    return (
        <div id="pageRoom">
            <header>
                <div className="content">
                    <img src={LogoImg} alt="LetMeAsk" />
                    <div>Código da sala</div>
                </div>
            </header>
            <main className="content">
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>
                <form>
                    <textarea placeholder="O que você quer perguntar ?"/>
                    <div className="form-footer">
                        <span>Para enviar uma pergunta, <button>faça seu login.</button></span>
                        <Button type="submit">Enviar Pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    );
}