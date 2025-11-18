// Jogo da Velha - script principal
document.addEventListener('DOMContentLoaded', () => {
  const cells = Array.from(document.querySelectorAll('.cell'));
  const status = document.getElementById('status');
  const restartBtn = document.getElementById('restart');

  let board = Array(9).fill('');
  let current = 'X';
  let running = true;

  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  function render(){
    cells.forEach((cell, i) => {
      cell.textContent = board[i];
      cell.classList.toggle('filled', !!board[i]);
    });
    if(running){
      status.textContent = `Vez: ${current}`;
    }
  }

  function checkWin(){
    for(const combo of winCombos){
      const [a,b,c] = combo;
      if(board[a] && board[a] === board[b] && board[a] === board[c]){
        return { winner: board[a], combo };
      }
    }
    if(board.every(Boolean)) return { winner: null };
    return null;
  }

  function endGame(result){
    running = false;
    if(result && result.winner){
      status.textContent = `Vencedor: ${result.winner}`;
      result.combo.forEach(i => cells[i].classList.add('win'));
    } else {
      status.textContent = 'Empate!';
    }
  }

  function handleCellClick(e){
    const idx = Number(e.currentTarget.dataset.index);
    if(!running || board[idx]) return;
    board[idx] = current;
    const result = checkWin();
    if(result){
      endGame(result);
    } else {
      current = current === 'X' ? 'O' : 'X';
      status.textContent = `Vez: ${current}`;
    }
    render();
  }

  function restart(){
    board.fill('');
    current = 'X';
    running = true;
    cells.forEach(c => c.classList.remove('win'));
    status.textContent = `Vez: ${current}`;
    render();
  }

  // Suporte a teclado (Enter / Space) para acessibilidade
  cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
    cell.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        cell.click();
      }
    });
  });

  restartBtn.addEventListener('click', restart);

  render();
});
