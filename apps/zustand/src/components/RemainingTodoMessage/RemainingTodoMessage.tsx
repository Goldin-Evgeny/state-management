import _ from 'lodash';
import React from 'react';
import { useTodoStore } from '../../store';

function RemainingTodoMessage() {
  const todoList = useTodoStore((state) => state.todoList);
  const remainingTodoList = useTodoStore((state) => state.remainingTodoList);

  return (
    <p>
      {_.size(todoList) && remainingTodoList() === 0 ? (
        'All done!'
      ) : (
        <>
          You have <b>{remainingTodoList()}</b> of <b>{_.size(todoList)}</b>{' '}
          todoList remaining
        </>
      )}
    </p>
  );
}

export default React.memo(RemainingTodoMessage);
