import Footer from "./components/Footer";
import Header from "./components/Header";
import TaskContainer from "./components/TaskContainer";

export default function Home() {
     return (
          <main className="flex h-screen flex-col items-center w-full scrollbar-thin">
               <Header />
               <div className="flex-1 h-full overflow-y-auto w-full">
                    <TaskContainer />
               </div>
               <Footer />
          </main>
     );
}
