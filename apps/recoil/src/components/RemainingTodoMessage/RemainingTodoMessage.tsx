import _ from 'lodash';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { todoListAtom, remainingTodoListSelector } from '../../store';

function RemainingTodoMessage() {
  const todoList = useRecoilValue(todoListAtom);
  const remainingTodoList = useRecoilValue(remainingTodoListSelector);
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
