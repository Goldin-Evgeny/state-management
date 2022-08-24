import _ from 'lodash';
import React from 'react';
import { useTodoContext } from '../../store';

function RemainingTodoMessage() {
  const { todoList } = useTodoContext();
  const remainingTodoList = _.chain(todoList)
    .filter((todo) => !todo.done)
    .size()
    .value();

  return (
    <p>
      {_.size(todoList) && remainingTodoList === 0 ? (
        'All done!'
      ) : (
        <>
          You have <b>{remainingTodoList}</b> of <b>{_.size(todoList)}</b>{' '}
          todoList remaining
        </>
      )}
    </p>
  );
}

export default React.memo(RemainingTodoMessage);