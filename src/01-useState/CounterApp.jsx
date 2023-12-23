import { useState } from "react"

export const CounterApp = () => {

        /*TODO: 
        CUANDO SE TIENE UN OBJETO EN useState 
        se tienen que preservar
        Todos los valores de ese objeto
        Para realizar un cambio en el estado/s original*/
    const [state, setCounter] = useState({
        counter1: 10,
        counter2: 20,
        counter3: 30
    });

    const {counter1, counter2, counter3} = state;



  return (
    <>

        <h1>Counter1: { counter1 }</h1>
        <h1>Counter2: { counter2 }</h1>
        <h1>Counter3: { counter3 }</h1>

        <hr />

        <button className="btn" 
        onClick={ () => {
            setCounter({
                // counter1: counter1 + 1,
                // counter2,
                // counter3

                ...state,
                counter1: counter1 +1 
            });
        }}
        > + 1 </button>    
    
    
    </>
  )
}
