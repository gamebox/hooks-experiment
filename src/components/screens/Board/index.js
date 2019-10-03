import React from 'react';
import Column from '../../layout/Column';
import {
  moveCard,
  addNewCardToColumn,
  create,
  updateCard,
  TODO,
  IN_PROGRESS,
  DONE,
  BOARD,
} from '../../../utilities/board';
import useSyncedStorage from '../../../hooks/use-synced-storage';

import styles from './board.module.css';

export default function Board() {
  let [board, setBoard] = useSyncedStorage(BOARD, create());

  const onDropColumn = col => {
    return (event, currentDragIndex) => {
      if (board[col].length >= 100 || !event || !event.dataTransfer) {
        return false;
      }

      const source = event.dataTransfer.getData('source');
      const id = event.dataTransfer.getData('id');
      const idx =
        typeof currentDragIndex === 'number'
          ? currentDragIndex
          : event.dataTransfer.getData('idx') || 0;
      setBoard(moveCard(board, id, source, col, idx));

      return true;
    };
  };

  const onColumnAddCard = col => () => {
    setBoard(addNewCardToColumn(board, col));
  };

  const onColumnUpdateCard = col => (update, idx) => {
    setBoard(updateCard(board, col, idx, update));
  };

  const columns = [TODO, IN_PROGRESS, DONE];

  return (
    <div className={styles.board} id="board">
      {columns.map(col => (
        <Column
          columnTitle={col}
          key={col}
          cards={board[col]}
          onDrop={onDropColumn(col)}
          onAdd={onColumnAddCard(col)}
          onUpdateCard={onColumnUpdateCard(col)}
        />
      ))}
    </div>
  );
}
