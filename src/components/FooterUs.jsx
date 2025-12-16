import { FacebookIcon, GithubIcon, InstagramIcon, Mail, MessageCircle, MessageCircleDashedIcon, Phone, Send, WheatIcon, Youtube, YoutubeIcon } from "lucide-react";
import WaveEffect from "./WaveEffect";

const FooterUs = () => {
  return (
    <>
      <footer className="mt-15 pb-1 flex flex-col items-center justify-center rounded border border-gray-300">
        
        <p className="mt-2 text-center text-xs text-gray-500">
          Developed By :  &nbsp;@Altamash
        </p>
        
        <p className="mt-1 text-center text-xs text-gray-500">
          Copyright © 2025 Sanjeet Water Supplier. <br />
           All Rights Reservered.
        </p>
        <div className="flex items-center gap-4 mt-1">
          <a
            href="https://instagram.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon className="text-slate-500 w-4 hover:text-blue-500 active:text-blue-500" />
          </a>

          <a
            href="https://instagram.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="text-slate-500 w-4 hover:text-blue-500 active:text-blue-500"/>
          </a>

          <a
            href="https://instagram.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon className="text-slate-500 w-4 hover:text-blue-500 active:text-blue-500" />
          </a>

          <a
            href="https://instagram.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YoutubeIcon className="text-slate-500 w-4 hover:text-blue-500 active:text-blue-500"/>
          </a>
          
          <a
            href="https://instagram.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Send className="text-slate-500 w-4 hover:text-blue-500 active:text-blue-500"/>
          </a>
        </div>
      </footer>
    </>
  );
};

export default FooterUs;
