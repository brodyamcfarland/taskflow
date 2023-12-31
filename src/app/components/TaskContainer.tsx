"use client";

import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export interface Task {
     id: number;
     title: string;
     completed: boolean;
     timeTaken: number;
}

const TaskContainer = () => {
     const [tasks, setTasks] = useState<Task[]>([]);

     useEffect(() => {
          const storedTasks = localStorage.getItem("tasks");
          if (storedTasks) {
               setTasks(JSON.parse(storedTasks));
          }
     }, []);

     useEffect(() => {
          localStorage.setItem("tasks", JSON.stringify(tasks));
     }, [tasks]);

     const addTask = (newTask: Task) => {
          setTasks([...tasks, newTask]);
     };

     const updateTask = (taskId: number, updatedTask: Task) => {
          setTasks(
               tasks.map((task) => (task.id === taskId ? updatedTask : task))
          );
     };

     const deleteTask = (taskId: number) => {
          setTasks(tasks.filter((task) => task.id !== taskId));
     };

     const handleDragEnd = (result: any) => {
          if (!result.destination) {
               return;
          }

          const updatedTasks = Array.from(tasks);
          const [removed] = updatedTasks.splice(result.source.index, 1);
          updatedTasks.splice(result.destination.index, 0, removed);

          setTasks(updatedTasks);
     };

     return (
          <div className="flex flex-col max-w-5xl h-full w-full mx-auto bg-gradient-to-br from-white/10 to-black border-4 border-b-white/10 border-r-white/20 border-t-white/30 border-l-white/40">
               <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="taskList">
                         {(provided) => (
                              <div
                                   className="flex flex-col gap-2 w-full flex-1 p-2 overflow-y-auto scrollbarstyle"
                                   ref={provided.innerRef}
                                   {...provided.droppableProps}
                              >
                                   {tasks.map((task, index) => (
                                        <Draggable
                                             key={task.id.toString()}
                                             draggableId={task.id.toString()}
                                             index={index}
                                        >
                                             {(provided) => (
                                                  <div
                                                       ref={provided.innerRef}
                                                       {...provided.draggableProps}
                                                       {...provided.dragHandleProps}
                                                       className="bg-black w-full"
                                                  >
                                                       <TaskItem
                                                            task={task}
                                                            updateTask={
                                                                 updateTask
                                                            }
                                                            deleteTask={
                                                                 deleteTask
                                                            }
                                                       />
                                                  </div>
                                             )}
                                        </Draggable>
                                   ))}
                                   {provided.placeholder}
                              </div>
                         )}
                    </Droppable>
               </DragDropContext>
               <TaskForm addTask={addTask} />
          </div>
     );
};

export default TaskContainer;
