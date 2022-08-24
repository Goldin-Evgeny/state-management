import { useAtomValue } from 'jotai';
import _ from 'lodash';
import React from 'react';
import { remainingTodoListSelector, todoListSizeAtom } from '../../store';

function RemainingTodoMessage() {
  const todoListSize = useAtomValue(todoListSizeAtom);
  const remainingTodoList = useAtomValue(remainingTodoListSelector);

  return (
    <p>
      {todoListSize && remainingTodoList === 0 ? (
        'All done!'
      ) : (
        <>
          You have <b>{remainingTodoList}</b> of <b>{todoListSize}</b>{' '}
          todoList remaining
        </>
      )}
    </p>
  );
}

export default React.memo(RemainingTodoMessage);