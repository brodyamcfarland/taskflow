const Header = () => {
     return (
          <header className="flex items-center justify-center text-xl uppercase tracking-[.5rem] py-5 relative w-full">
               <div className="text-white relative w-full text-center">
                    <div className="flex gap-3 items-center justify-center z-10">
                         <span className="border-2 border-b-transparent border-r-transparent border-white/40 pl-2">
                              Task
                         </span>
                         <span className="border-2 border-t-transparent border-l-transparent border-white/40">
                              Flow
                         </span>
                    </div>
               </div>
          </header>
     );
};

export default Header;
