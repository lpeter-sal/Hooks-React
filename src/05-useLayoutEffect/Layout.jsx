import { useCounter, useFetch } from "../hooks";
import { LoadingQuote, Quote } from "../03-examples";


export const Layout = () => {
    
    const {  counter, increment } = useCounter(1);

    const { data, isLoading, hasError } = useFetch(`https://rickandmortyapi.com/api/episode/${counter}`);
    const { name, episode } = !!data && data;


  return (
    <>
    
        <h1>Breaking Bad Quotes</h1>
        <hr />

        {
            isLoading 
                ? <LoadingQuote />
                : <Quote name={ name }  episode={ episode } />
        }

        <button onClick={ () => increment()}
                disabled= { isLoading } 
                className="btn btn-primary">
            Next episode
        </button>

    </>
  )
}
