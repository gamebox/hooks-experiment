import React from 'react';

import gravatarUrl from '../../../utilities/gravatar';
import styles from './index.module.css';

export default function Card(props) {
  let [editing, setEditing] = React.useState(props.card.email === '');

  const onDragStart = evt => {
    if (!evt || !evt.dataTransfer) {
      return;
    }
    evt.dataTransfer.effectAllowed = 'move';
    evt.dataTransfer.setData('id', props.card.id);
    evt.dataTransfer.setData('source', props.column);
    evt.dataTransfer.setData('idx', props.index);
  };

  const onDragOver = evt => {
    props.onDragOver(props.index);
    evt.preventDefault();

    return false;
  };

  const onDragEnd = evt => {
    evt.preventDefault();

    return false;
  };

  const editFormSubmit = (evt, update) => {
    props.onUpdate(update, props.index);

    setEditing(false);
    evt.preventDefault();
  };

  if (editing) {
    return (
      <div className={styles.card} data-component="Card">
        <CardEditForm
          onUpdate={editFormSubmit}
          onCancel={() => setEditing(false)}
          card={props.card}
        />
      </div>
    );
  }

  return (
    <div
      draggable
      className={styles.card}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDoubleClick={() => setEditing(true)}
      data-component="Card"
    >
      <div className={styles.cardHeader}>
        <div
          style={{
            backgroundImage: `url(${gravatarUrl(props.card.email || '')})`,
          }}
          className={styles.avatar}
          alt={props.card.userName || "Creator' Avatar"}
        />
        <h3 className={styles.title}>
          {props.card.title}
        </h3>
      </div>
      {props.card.description.split('\n\n').map(paragraph => (
        <p key={paragraph} className={styles.body}>{paragraph}</p>
      ))}
    </div>
  );
}

function CardEditForm(props) {
  let [title, setTitle] = React.useState(props.card.title);
  let [email, setEmail] = React.useState(props.card.email);
  let [description, setDescription] = React.useState(props.card.description);

  const onSubmit = evt => {
    props.onUpdate(evt, { ...props.card, title, email, description });
  };

  const val = f => evt => f(evt.target.value);

  return (
    <form onSubmit={onSubmit} data-component="CardEditForm">
      <label htmlFor="title" className={styles.cardEditLabel}>
        Title
      </label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={val(setTitle)}
        className={styles.cardEditInput}
      />

      <label htmlFor="email" className={styles.cardEditLabel}>
        Email
      </label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={val(setEmail)}
        className={styles.cardEditInput}
      />

      <label htmlFor="description" className={styles.cardEditLabel}>
        Description
      </label>
      <textarea
        id="description"
        type="text"
        value={description}
        onChange={val(setDescription)}
        className={styles.cardEditInput}
        style={{ minHeight: '5rem' }}
      />

      <div className={styles.cardEditButtonWrapper}>
        <button className={styles.cardEditCancel} onClick={props.onCancel}>
          Cancel
        </button>
        <input
          className={styles.cardEditSubmit}
          type="submit"
          value="Save task"
        />
      </div>
    </form>
  );
}
