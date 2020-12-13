import React, { memo } from 'react';
import Task from './Task';

const TaskList = memo(({ filteredTasks, status }) => {
  return filteredTasks.length ? (
    <ul className="task-list">
      {filteredTasks.map((task) => (
        <Task key={task.id} {...task} /> // Spread operator
      ))}
    </ul>
  ) : status !== 'all' ? (
    <ul className="task-list">
      <Task task={{ completed: false, id: 'null', text: 'No result' }} />
    </ul>
  ) : (
    ''
  );
});

export default TaskList;
