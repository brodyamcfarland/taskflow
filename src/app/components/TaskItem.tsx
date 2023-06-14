import React, { useState, useEffect } from "react";
import { Task } from "./TaskContainer";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { BiStop, BiPlay } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";

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
     }, [task.completed, timerId]);

     useEffect(() => {
          // Update the task's timeTaken value in local storage
          const updatedTask = { ...task, timeTaken };
          updateTask(task.id, updatedTask);
     }, [timeTaken]);

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

     const formatTime = (time: number) => {
          const hours = Math.floor(time / 3600);
          const minutes = Math.floor((time % 3600) / 60);
          const seconds = time % 60;

          return (
               <div className="flex flex-col md:flex-row border-2 border-b-white/20 border-r-white/20 border-white/40 items-center justify-center text-xs divide-y-[1px] md:divide-x-[1px] divide-white/30">
                    <div className="flex flex-col items-center justify-center w-10">
                         <span>{hours}</span>
                         <span className="text-gray-400">Hrs</span>
                    </div>
                    <div className="flex flex-col items-center justify-center w-10">
                         <span>{minutes}</span>
                         <span className="text-gray-400">Min</span>
                    </div>
                    <div className="flex flex-col items-center justify-center w-10">
                         <span>{seconds}</span>
                         <span className="text-gray-400">Sec</span>
                    </div>
               </div>
          );
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
          <div
               className={`flex gap-1 h-36 md:h-34 items-center justify-start py-1 px-3 border-2 max-w-full rounded-md ${
                    task.completed
                         ? "border-emerald-500/50"
                         : "border-gray-500/50"
               }`}
          >
               <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={handleCheckboxChange}
                    className="flex-shrink-0 appearance-none rounded-full border-2 border-gray-600 checked:bg-emerald-500/75 checked:border-gray-600 h-5 w-5 hover:cursor-pointer"
               />
               {editing ? (
                    <textarea
                         value={editedTitle}
                         onChange={(e) => setEditedTitle(e.target.value)}
                         className="h-20 flex-1 p-3 overflow-y-auto bg-gradient-to-br from-[#242424] to-black rounded-sm text-white ml-2"
                    />
               ) : (
                    <div className="flex flex-col flex-1 w-full">
                         <span className="text-[10px] text-gray-300 tracking-widest text-center border-b border-white/20">
                              TASK
                         </span>
                         <div className="flex flex-col flex-1 w-full">
                              <span className="h-20 p-3 text-sm overflow-y-auto overflow-x-hidden">
                                   {task.title}
                              </span>
                         </div>
                    </div>
               )}
               <div className="flex flex-col gap-2 items-center justify-center mx-2">
                    {editing ? (
                         <button
                              onClick={handleSaveClick}
                              className="rounded-full p-1 hover:bg-green-500/50 duration-700"
                         >
                              <AiOutlineCheck size={20} />
                         </button>
                    ) : (
                         <button
                              onClick={handleEditClick}
                              className="rounded-full p-1 hover:bg-yellow-500/50 duration-700"
                              title="Edit"
                         >
                              <HiOutlinePencil size={20} />
                         </button>
                    )}
                    <button
                         onClick={handleDeleteClick}
                         className="rounded-full p-1 hover:bg-red-500/50 duration-700"
                         title="Delete"
                    >
                         <HiOutlineTrash size={20} />
                    </button>
               </div>
               {task.completed ? (
                    <span className="md:w-[132px] text-center text-xs flex flex-col items-center justify-center">
                         <span className="text-gray-200 hidden md:block">
                              Completion Time
                         </span>{" "}
                         {formatTime(timeTaken)}{" "}
                    </span>
               ) : (
                    <div className="flex flex-col items-center justify-center">
                         <span className="ml-0 md:ml-2">
                              {formatTime(timeTaken)}
                         </span>
                         <div className="flex text-xs border-2 border-t-white/10 md:border-t-transparent border-l-white/20 border-b-white/30 border-r-white/40 divide-x-[1px] divide-white/30">
                              <button
                                   onClick={startTimer}
                                   className="px-1 hover:bg-white/10 duration-500"
                                   title="Start Timer"
                              >
                                   <BiPlay
                                        size={20}
                                        className="text-green-500"
                                   />
                              </button>
                              <button
                                   onClick={stopTimer}
                                   className="px-1 hover:bg-white/10 duration-500"
                                   title="Stop Timer"
                              >
                                   <BiStop size={20} className="text-red-500" />
                              </button>
                         </div>
                    </div>
               )}
          </div>
     );
};

export default TaskItem;
