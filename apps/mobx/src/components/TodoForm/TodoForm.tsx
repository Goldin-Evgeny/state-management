import _ from 'lodash';
import { observer } from 'mobx-react';
import React from 'react';
import store from '../../store';

import styles from './TodoForm.module.scss';

function TodoForm() {
  return (
    <div className={styles['root']}>
      <input
        className={store.todoAlreadyExists ? styles['invalid'] : ''}
        type="text"
        value={store.editedTodo}
        onChange={(evt) => (store.editedTodo = evt.target.value)}
        placeholder="Add todo..."
        onKeyUp={(evt) => evt.key === 'Enter' && store.addTodo()}
      />
      <button onClick={() => store.addTodo()}>+</button>
    </div>
  );
}

export default observer(TodoForm);
