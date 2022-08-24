import _ from 'lodash';
import { observer } from 'mobx-react';
import store from '../../store';

function RemainingTodoMessage() {
  return (
    <p>
      {_.size(store.todoList) && store.remainingTodoItems === 0 ? (
        'All done!'
      ) : (
        <>
          You have <b>{store.remainingTodoItems}</b> of{' '}
          <b>{_.size(store.todoList)}</b> todoList remaining
        </>
      )}
    </p>
  );
}

export default observer(RemainingTodoMessage);
