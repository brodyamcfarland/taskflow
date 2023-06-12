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
          <div className="w-full h-full flex-1 max-w-4xl flex flex-col">
               <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="taskList" direction="horizontal">
                         {(provided) => (
                              <div
                                   className="md:grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 flex flex-col gap-4 border p-4 bg-white/40"
                                   ref={provided.innerRef}
                                   {...provided.droppableProps}
                              >
                                   {tasks.map((task, index) => (
                                        <Draggable
                                             key={task.id}
                                             draggableId={task.id.toString()}
                                             index={index}
                                        >
                                             {(provided) => (
                                                  <div
                                                       ref={provided.innerRef}
                                                       {...provided.draggableProps}
                                                       {...provided.dragHandleProps}
                                                  >
                                                       <Droppable
                                                            droppableId={task.id.toString()}
                                                            direction="vertical"
                                                       >
                                                            {(provided) => (
                                                                 <div
                                                                      ref={
                                                                           provided.innerRef
                                                                      }
                                                                      {...provided.droppableProps}
                                                                      className="grid-item bg-black"
                                                                 >
                                                                      <TaskItem
                                                                           task={
                                                                                task
                                                                           }
                                                                           updateTask={
                                                                                updateTask
                                                                           }
                                                                           deleteTask={
                                                                                deleteTask
                                                                           }
                                                                      />
                                                                      {
                                                                           provided.placeholder
                                                                      }
                                                                 </div>
                                                            )}
                                                       </Droppable>
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
