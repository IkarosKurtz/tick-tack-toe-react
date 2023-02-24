import { useState } from 'react';

type PlayerSymbol = 'X' | 'O';

interface Player {
  class: string
  symbol: PlayerSymbol
}

type WinOptions = {
  [key: number]: number[][]
}

const players: Player[] = [
  {
    class: 'first',
    symbol: 'X'
  },
  {
    class: 'second',
    symbol: 'O'
  }
]

const $ = (selector: string) => document.querySelector(selector)
const $$ = (selector: string) => document.querySelectorAll(selector)


export function useGame() {
  // Estados necesarios para el juego
  const [player, setPlayer] = useState<Player>(players[0])
  const [winner, setWinner] = useState(false)

  const $boardTiles = $$('.board-square')
  const $board = $('.board') as HTMLDivElement

  const boardTiles = Array.from($boardTiles)

  /**
   * Cambia el turno del jugador actual
   * @param player - Símbolo del jugador actual
   */
  const changePlayer = (player: PlayerSymbol) => setPlayer(player === 'X' ? players[1] : players[0])

  /**
  * Verifica si hay un empate y si lo hay, deshabilita las casillas restantes cambiando sus clases
  */
  const checkDraw = () => {
    const isDraw = boardTiles.every((s) => s.textContent !== '')

    if (isDraw) {
      for (const square of boardTiles) {
        square.classList.add('disabled')
      }
    }
  }

  /**
   * Verifica si hay un ganador y si lo hay, deshabilita las casillas restantes cambiando sus clases
   * y hace un set al estado winner
   * @returns Retorna el símbolo del ganador o undefined si todavía no hay ganador
   */
  const checkWinner = () => {
    const comb: WinOptions = {
      0: [[1, 2], [3, 6], [4, 8]],
      1: [[0, 2], [4, 7]],
      2: [[0, 1], [5, 8], [4, 6]],
      3: [[0, 6], [4, 5]],
      4: [[0, 8], [1, 7], [2, 6], [3, 5]],
      5: [[2, 8], [3, 4]],
      6: [[0, 3], [2, 4], [7, 8]],
      7: [[1, 4], [6, 8]],
      8: [[0, 4], [2, 5], [6, 7]]
    }

    for (const square of boardTiles) {
      const index = boardTiles.indexOf(square)

      for (const [a, b] of comb[index]) {
        if (
          square.classList.contains(player.class) &&
          boardTiles[a].classList.contains(player.class) &&
          boardTiles[b].classList.contains(player.class)
        ) {
          setWinner(true)

          for (const square2 of boardTiles) {
            if (square2 !== boardTiles[a] && square2 !== boardTiles[b] && square !== square2) square2.classList.add('disabled')
          }

          return player.symbol
        }
      }
    }

    checkDraw()
  }

  /**
   * Reinicia las casillas del juego y el estado winner
   */
  const handleGame = () => {
    // Se reinicia el juego

    $board.classList.add('restart-board')

    setWinner(true)

    // Para que acabe la animación del table antes de reiniciar el juego
    setTimeout(() => {
      for (const square of boardTiles) {
        square.classList.remove('first', 'second', 'disabled')

        if (!square.firstChild) return

        square.children[0].classList.remove('ani')
        square.firstChild.textContent = ''
      }

      $board.classList.remove('restart-board')

      setWinner(false)
    }, 1000 * .81)
  }

  return {
    changePlayer,
    checkWinner,
    handleGame,
    player,
    winner
  }
}