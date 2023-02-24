import { useGame } from './hooks/useGame'
import { useSound } from './hooks/useSound'
import Write from './assets/write.mp3'
import './App.css'

let previousTitle = document.title

window.addEventListener('blur', () => {
  previousTitle = document.title
  document.title = 'Estamos bajo ataque!'
})

window.addEventListener('focus', () => {
  document.title = previousTitle
})

function App() {
  // Custom hook
  const { changePlayer, checkWinner, handleGame, player, winner } = useGame()
  const { Sound, audio, play } = useSound()

  function handlerSquare(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // Si ya hay un simbolo en la casilla, no se puede cambiar
    const { currentTarget: target } = event


    // El contenedor del simbolo
    const container = target.children[0]

    // Si ya hay un simbolo, no se puede cambiar y si hay un ganador tampoco
    if (!container || container.textContent !== '' || winner) return

    // Se agrega el simbolo al tablero
    container.textContent = player.symbol
    play()

    // Se le agregan las clases para cambiar el color
    target.classList.add(player.class)
    container.classList.add('ani')

    checkWinner()

    // Se cambia el turno
    changePlayer(player.symbol)
  }

  return (
    <div className="App">
      <div className='game-title'>
        <h1>Tick-Tack-Toe</h1>

      </div>
      <div className='board'>
        <div className="board-square" onClick={handlerSquare}><p></p></div>
        <div className="board-square" onClick={handlerSquare}><p></p></div>
        <div className="board-square" onClick={handlerSquare}><p></p></div>
        <div className="board-square" onClick={handlerSquare}><p></p></div>
        <div className="board-square" onClick={handlerSquare}><p></p></div>
        <div className="board-square" onClick={handlerSquare}><p></p></div>
        <div className="board-square" onClick={handlerSquare}><p></p></div>
        <div className="board-square" onClick={handlerSquare}><p></p></div>
        <div className="board-square" onClick={handlerSquare}><p></p></div>
      </div>
      <div className='menu'>
        <button onClick={handleGame}>Restart</button>
      </div>
      <Sound audio={audio} src={Write} />
    </div>
  )
}

export default App
