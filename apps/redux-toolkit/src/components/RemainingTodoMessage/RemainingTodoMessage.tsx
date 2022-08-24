import _ from 'lodash';
import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectTodoList, selectRemainingTodoList } from '../../redux/todoSlice';

function RemainingTodoMessage() {
  const todoList = useAppSelector(selectTodoList);
  const remainingTodoItems = useAppSelector(selectRemainingTodoList);

  return (
    <p>
      {_.size(todoList) && remainingTodoItems === 0 ? (
        'All done!'
      ) : (
        <>
          You have <b>{remainingTodoItems}</b> of <b>{_.size(todoList)}</b>{' '}
          todoList remaining
        </>
      )}
    </p>
  );
}

export default React.memo(RemainingTodoMessage);
