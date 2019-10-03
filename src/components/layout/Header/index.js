import React from 'react';

import styles from './index.module.css';

export default function Header() {
  return (
    <header className={styles.main}>
      <h1 className={styles.title}>Kanban w/ Hooks</h1>
    </header>
  );
}
