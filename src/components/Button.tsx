import { useState } from 'react';

type ButtonProps = {
    text? : string //? opcional
}



export function Button(_props : ButtonProps){
    const [contador, setContador] = useState(0);
    const incrementaContador = function(){
        setContador(contador +1);
    }
    return(
        <button onClick={incrementaContador}> Clique {contador}</button>
    )
}