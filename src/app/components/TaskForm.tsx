import React, { useState } from "react";
import { Task } from "./TaskContainer";
import { HiPlus } from "react-icons/hi";

interface TaskFormProps {
     addTask: (newTask: Task) => void;
}

const TaskForm = ({ addTask }: TaskFormProps) => {
     const [taskTitle, setTaskTitle] = useState("• ");

     const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
          const inputValue = e.target.value;

          // Split the input into lines
          const lines = inputValue.split("\n");

          // Remove any existing bullet points at the beginning of each line
          const formattedLines = lines.map((line) => line.replace(/^•\s*/, ""));

          // Add a bullet point prefix to each line
          const formattedValue = formattedLines
               .map((line, index) => {
                    if (
                         index === formattedLines.length - 1 &&
                         line.trim() === ""
                    ) {
                         return line; // Preserve the empty last line without a bullet point
                    }
                    return `• ${line}`;
               })
               .join("\n");

          setTaskTitle(formattedValue);
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
               className="flex items-center justify-center border-t-white/30 border-t-4 gap-2 p-2 bg-black"
          >
               <textarea
                    value={taskTitle}
                    onChange={handleInputChange}
                    className="w-full border-2 border-white/40 bg-black text-white p-2 scrollbarstyle resize-none text-sm h-28"
               />
               <button
                    type="submit"
                    className="border-2 rounded-full p-1 border-white/50 hover:bg-emerald-500/50 duration-500"
                    title="Add Task"
               >
                    <HiPlus />
               </button>
          </form>
     );
};

export default TaskForm;
