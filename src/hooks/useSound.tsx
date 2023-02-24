import { useRef } from 'react'

interface Props {
  audio: React.RefObject<HTMLAudioElement>
  src: string
}

const Sound = ({ audio, src }: Props) => (
  <audio ref={audio} src={src} />
)

export function useSound () {
  const audio = useRef<HTMLAudioElement>(null)
  const play = () => {
    if (audio.current) {
      audio.current.volume = 0.8
      audio.current.play()
    }
  }
  const stop = () => {
    if (audio.current) audio.current.pause()
  }

  return { play, stop, audio, Sound }
}