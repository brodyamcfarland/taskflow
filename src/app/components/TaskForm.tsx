import React, { useState } from "react";
import { Task } from "./TaskContainer";

interface TaskFormProps {
     addTask: (newTask: Task) => void;
}

const TaskForm = ({ addTask }: TaskFormProps) => {
     const [taskTitle, setTaskTitle] = useState("");

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setTaskTitle(e.target.value);
     };

     const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          if (taskTitle.trim() !== "") {
               const newTask: Task = {
                    id: Date.now(),
                    title: taskTitle,
                    completed: false,
                    timeTaken: 0,
               };
               addTask(newTask);
               setTaskTitle("");
          }
     };

     return (
          <form
               onSubmit={handleSubmit}
               className="flex items-center justify-center border gap-2 p-1"
          >
               <input
                    type="text"
                    value={taskTitle}
                    onChange={handleInputChange}
                    placeholder="Enter task title"
                    className="text-black"
               />
               <button type="submit" className="border px-1">
                    Add
               </button>
          </form>
     );
};

export default TaskForm;
