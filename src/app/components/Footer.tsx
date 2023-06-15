import Link from "next/link";
import {
     RiGithubLine,
     RiGithubFill,
     RiTwitterLine,
     RiLinkedinBoxFill,
} from "react-icons/ri";

const Footer = () => {
     return (
          <footer className="flex gap-4 py-2">
               <Link
                    href={"https://github.com/brodyamcfarland/taskflow"}
                    target="_blank"
                    className="flex flex-col items-center justify-center md:opacity-50 md:hover:opacity-100 duration-700"
                    title="Github - Code"
               >
                    <RiGithubFill size={25} />
                    <span className="text-[9px] tracking-widest text-gray-300">
                         Code
                    </span>
               </Link>
               <Link
                    href={"https://github.com/brodyamcfarland"}
                    target="_blank"
                    className="flex flex-col items-center justify-center md:opacity-50 md:hover:opacity-100 duration-700"
                    title="Github - Dev"
               >
                    <RiGithubLine size={25} />
                    <span className="text-[9px] tracking-widest text-gray-300">
                         Dev
                    </span>
               </Link>
               <Link
                    href={
                         "https://www.linkedin.com/in/brody-mcfarland-93a91b106/"
                    }
                    target="_blank"
                    className="flex flex-col items-center justify-center md:opacity-50 md:hover:opacity-100 duration-700"
                    title="LinkedIn"
               >
                    <RiLinkedinBoxFill size={25} />
                    <span className="text-[9px] tracking-widest text-gray-300">
                         LinkedIn
                    </span>
               </Link>
               <Link
                    href={"https://twitter.com/home"}
                    target="_blank"
                    className="flex flex-col items-center justify-center md:opacity-50 md:hover:opacity-100 duration-700"
                    title="Twitter"
               >
                    <RiTwitterLine size={25} />
                    <span className="text-[9px] tracking-widest text-gray-300">
                         Twitter
                    </span>
               </Link>
          </footer>
     );
};

export default Footer;
