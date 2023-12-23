import { useLayoutEffect, useRef, useState } from "react"

export const Quote = ({name, episode}) => {

  const pRef = useRef();
  const [boxSize, setBoxSize] = useState({ width: 0, height: 0});

  useLayoutEffect(() => {
    const {height, width} = (pRef.current.getBoundingClientRect());
    setBoxSize({height, width})

  }, [])


  return (
    <>
      <blockquote 
          className="blockquote text-end"
          style={ {display: 'flex'} }
      >
          <p ref={ pRef } className="mb-1"> { name } </p>
          <footer className="blockquote-footer mt-1"> { episode } </footer>
      </blockquote>
      <code> { JSON.stringify(boxSize)} </code>
    
    </>
  )
}
