import Header from "./components/Header";
import TaskContainer from "./components/TaskContainer";

export default function Home() {
     return (
          <main className="flex max-h-screen h-full flex-col items-center">
               <Header />
               <TaskContainer />
          </main>
     );
}
