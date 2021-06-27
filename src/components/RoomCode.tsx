import toast from 'react-hot-toast';
import copyImg from '../assets/images/copy.svg';
import '../styles/room-code.scss';

type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps){
    function copyRoomCodeToClipboard(){
        navigator.clipboard.writeText(props.code);
        toast.success('Código da sala copiado com sucesso.');
    }

    return (
        <button className="room-code"
        onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span>sala #{props.code}</span>
        </button>
    )
}