import React, { useEffect } from 'react';
// import LOADINGIMG from '../../assets/loadingimg.jpg'
import ERRORIMG from '../assets/Noimageplaceholder.png'
import LOADINGIMG from "../assets/loadingGif.gif";


type Props = {
  index: number;
  url: string;
}

const defaultImageMap: Record<"LOADING" | "ERROR" | "LOADED", string> = {
  LOADING: LOADINGIMG,
  ERROR: ERRORIMG,
  LOADED: ""
}

export default function LazyImg({ index, url }: Props) {

  const [currentState, setCurrentState] = React.useState<keyof typeof defaultImageMap>("LOADING")

  useEffect(() => {
    const resImg = new Image()
    resImg.setAttribute("width", "100%");
    resImg.setAttribute("height", "100%");
    resImg.setAttribute("display", "block");
    resImg.setAttribute("aspect-ratio", "1 / 1");
    resImg.setAttribute("object-fit", "cover");
    resImg.setAttribute("object-position", "center");
    resImg.alt = `Img + ${index + 1}`
    resImg.src = url

    resImg.onload = () => {
      setCurrentState("LOADED")
    }

    resImg.onerror = () => {
      setCurrentState("ERROR")
    }
  })

  return (
    <img
      src={defaultImageMap[currentState] || url}
      alt={'No image'}
      style={{
        width: "100%",
        height: "100%",
        display: 'block',
        aspectRatio: '1 / 1',
        objectFit: 'cover',
        objectPosition: 'center',
      }}
    />
  )
}