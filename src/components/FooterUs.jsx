import { FacebookIcon, GithubIcon, InstagramIcon, Mail, MessageCircle, MessageCircleDashedIcon, Phone, Send, WheatIcon, Youtube, YoutubeIcon } from "lucide-react";
import WaveEffect from "./WaveEffect";

const FooterUs = () => {
  return (
    <>
      <footer className="mt-5 flex flex-col items-center justify-center rounded py-5 px-1 border border-gray-300">
        <p className="mt-4 text-center text-gray-500">
          Copyright © 2025 Sanjeet Water Supplier. All Rights Reservered.
        </p>
        <div className="flex items-center gap-4 mt-5">
          <a
            href="https://instagram.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon className="text-slate-500" />
          </a>

          <a
            href="https://instagram.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="text-slate-500"/>
          </a>

          <a
            href="https://instagram.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon className="text-slate-500" />
          </a>

          <a
            href="https://instagram.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YoutubeIcon className="text-slate-500"/>
          </a>
          
          <a
            href="https://instagram.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Send className="text-slate-500"/>
          </a>
        </div>
      </footer>
    </>
  );
};

export default FooterUs;
