export const BOARD = 'KANBAN::BOARD_STATE';
export const TODO = 'To do';
export const IN_PROGRESS = 'In progress';
export const DONE = 'Done';

function maxId(board) {
  return [...board[TODO], ...board[IN_PROGRESS], ...board[DONE]].reduce(
    (acc, card) => (parseInt(card.id) > acc ? parseInt(card.id) : acc),
    0,
  );
}

export function create() {
  return {
    [TODO]: [],
    [IN_PROGRESS]: [],
    [DONE]: [],
  };
}

export function addNewCardToColumn(board, col) {
  // ID should more than likely be an UUID at scale.
  // String representation of a monotonically increasing
  // integer is reasonable however for a local application.
  const id = '' + (maxId(board) + 1);
  const newCard = {
    id,
    title: '',
    description: '',
    email: '',
  };

  return {
    ...board,
    [col]: insertCardIntoColumn(newCard, 0, board[col]),
  };
}

function insertCardIntoColumn(card, idx, col) {
  return idx === 0
    ? [card, ...col]
    : [...col.slice(0, idx), card, ...col.slice(idx)];
}

export function moveCard(board, id, source, dest, idx = 0) {
  if (source === dest) {
    return {
      ...board,
      [dest]: insertCardIntoColumn(
        board[dest].find(c => c.id === id),
        idx,
        board[dest].filter(c => c.id !== id),
      ),
    };
  } else {
    const srcCol = board[source].filter(c => c.id !== id);
    const card = board[source].find(c => c.id === id);
    const destCol = insertCardIntoColumn(card, idx, board[dest]);

    return {
      ...board,
      [source]: srcCol,
      [dest]: destCol,
    };
  }
}

export function updateCard(board, col, idx, updatedCard) {
  return {
    ...board,
    [col]: insertCardIntoColumn(
      updatedCard,
      idx,
      board[col].filter(c => c.id !== updatedCard.id),
    ),
  };
}
