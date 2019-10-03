import React from 'react';

import Card from '../Card';

import styles from './index.module.css';

export default function Column(props) {
  let [currentDragIndex, setCurrentDragIndex] = React.useState(null);

  const onDraggedOverCard = idx => {
    setCurrentDragIndex(idx);
  };
  return (
    <div
      className={styles.column}
      onDrop={e => props.onDrop(e, currentDragIndex)}
      onDragEnd={e => e.preventDefault()}
      onDragOver={event => event.preventDefault()}
      data-component="Column"
    >
      <div className={styles.columnHeader}>
        <h2>{props.columnTitle}</h2>
        {props.cards.length < 100 ? (
          <i
            className={`fas fa-plus ${styles.columnIcon}`}
            onClick={props.onAdd}
          ></i>
        ) : (
          <i />
        )}
      </div>
      <div className={styles.columnCardList}>
        {props.cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            index={index}
            column={props.columnTitle}
            onDragOver={onDraggedOverCard}
            onUpdate={props.onUpdateCard}
          />
        ))}
      </div>
    </div>
  );
}
