import * as Board from './board';

describe('updateCard', () => {
  it('should update a card', () => {
    const board = {
      [Board.TODO]: [{ id: 2 }, { id: 1, title: 'B' }],
      [Board.IN_PROGRESS]: [],
    };
    const updatedCard = { id: 2, title: 'A' };
    const newBoard = Board.updateCard(board, Board.TODO, 0, updatedCard);

    expect(newBoard[Board.TODO].length).toEqual(2);
    expect(newBoard[Board.TODO][0].title).toEqual('A');
  });
});

describe('moveCard', () => {
  it('should work correctly moving a card from one column to the next', () => {
    const board = { [Board.TODO]: [{ id: '1' }], [Board.IN_PROGRESS]: [] };
    const newBoard = Board.moveCard(board, '1', Board.TODO, Board.IN_PROGRESS);

    expect(newBoard[Board.IN_PROGRESS].length).toEqual(1);
    expect(newBoard[Board.IN_PROGRESS][0].id).toEqual('1');
    expect(newBoard[Board.TODO].length).toEqual(0);
  });

  it('should work correctly moving a card in the same column', () => {
    const board = {
      [Board.TODO]: [{ id: '1' }, { id: '2' }],
      [Board.IN_PROGRESS]: [],
    };
    const newBoard = Board.moveCard(board, '2', Board.TODO, Board.TODO, 0);

    expect(newBoard[Board.TODO].length).toEqual(2);
    expect(newBoard[Board.TODO][0].id).toEqual('2');
    expect(newBoard[Board.TODO][1].id).toEqual('1');
  });
});

describe('addNewCardToColumn', () => {
  it('should add a card to the beginning of a column', () => {
    const board = Board.create();
    const newBoard = Board.addNewCardToColumn(board, Board.TODO);
    expect(newBoard[Board.TODO].length).toEqual(1);
    expect(newBoard[Board.TODO][0].id).toEqual('1');

    const newBoard2 = Board.addNewCardToColumn(newBoard, Board.TODO);
    expect(newBoard2[Board.TODO].length).toEqual(2);
    expect(newBoard2[Board.TODO][0].id).toEqual('2');
  });

  it('should create a new card with the correct id', () => {
    const board = {
      [Board.TODO]: [{ id: '4' }],
      [Board.IN_PROGRESS]: [{ id: '2' }],
      [Board.DONE]: [{ id: '24' }],
    };
    const newBoard = Board.addNewCardToColumn(board, Board.TODO);
    expect(newBoard[Board.TODO].length).toEqual(2);
    expect(newBoard[Board.TODO][0].id).toEqual('25');
  });
});

describe('simulated activity', () => {
  it('new board, add card, update, move, move back, add card, update', () => {
    const board = Board.create();
    const nb = Board.addNewCardToColumn(board, Board.TODO);
    const nb1 = Board.updateCard(nb, Board.TODO, 0, {
      ...nb[Board.TODO][0],
      title: 'A',
    });
    const nb2 = Board.moveCard(nb1, '1', Board.TODO, Board.IN_PROGRESS);
    const nb3 = Board.moveCard(nb2, '1', Board.IN_PROGRESS, Board.TODO);
    const nb4 = Board.addNewCardToColumn(nb3, Board.TODO);
    const nb5 = Board.updateCard(nb, Board.TODO, 0, {
      ...nb4[Board.TODO][0],
      title: 'B',
    });

    expect(nb5[Board.TODO].length).toEqual(2);
    expect(nb5[Board.IN_PROGRESS].length).toEqual(0);
    expect(nb5[Board.DONE].length).toEqual(0);
    expect(nb5[Board.TODO][0].id).toEqual('2');
    expect(nb5[Board.TODO][1].id).toEqual('1');
  });
});
