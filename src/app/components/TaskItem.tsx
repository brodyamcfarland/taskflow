import React, { useState, useEffect } from "react";
import { Task } from "./TaskContainer";

interface TaskItemProps {
     task: Task;
     updateTask: (taskId: number, updatedTask: Task) => void;
     deleteTask: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
     task,
     updateTask,
     deleteTask,
}) => {
     const [editing, setEditing] = useState(false);
     const [editedTitle, setEditedTitle] = useState(task.title);
     const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
     const [timeTaken, setTimeTaken] = useState(task.timeTaken);

     useEffect(() => {
          if (task.completed && timerId) {
               stopTimer();
          }
     }, [task.completed]);

     const startTimer = () => {
          const id: NodeJS.Timeout = setInterval(
               () => setTimeTaken((prevTime) => prevTime + 1),
               1000
          );
          setTimerId(id);
     };

     const stopTimer = () => {
          if (timerId) {
               clearInterval(timerId);
               setTimerId(null);
          }
     };

     const handleCheckboxChange = () => {
          const updatedTask = { ...task, completed: !task.completed };
          updateTask(task.id, updatedTask);

          stopTimer();
     };

     const handleEditClick = () => {
          setEditing(true);
     };

     const handleSaveClick = () => {
          const updatedTask = { ...task, title: editedTitle };
          updateTask(task.id, updatedTask);
          setEditing(false);
     };

     const handleDeleteClick = () => {
          stopTimer();
          deleteTask(task.id);
     };

     return (
          <div className="flex flex-col gap-1 items-center justify-start p-1 border">
               <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={handleCheckboxChange}
               />
               {editing ? (
                    <input
                         type="text"
                         value={editedTitle}
                         onChange={(e) => setEditedTitle(e.target.value)}
                         className="text-black"
                    />
               ) : (
                    <span>{task.title}</span>
               )}
               {editing ? (
                    <button onClick={handleSaveClick} className="border px-1">
                         Save
                    </button>
               ) : (
                    <button onClick={handleEditClick} className="border px-1">
                         Edit
                    </button>
               )}
               <button onClick={handleDeleteClick} className="border px-1">
                    Delete
               </button>
               <div className="flex items-center justify-center gap-2">
                    <span className="ml-2">Time: {timeTaken} seconds</span>
                    <button onClick={startTimer} className="px-1 border">
                         Start
                    </button>
                    <button onClick={stopTimer} className="px-1 border">
                         Stop
                    </button>
               </div>
          </div>
     );
};

export default TaskItem;
