import React from "react";
import { Link } from "react-router-dom";
import {Footercopy} from "./Footercopy";
// import "../styles/temp.css";
// import Logo from './Logo';

const Footer = () => {
  return (
    <div className="bg-neutral-950">
      <Footercopy/>

      <div className=""></div>

      <footer className="bg-neutral-950 text-white py-15 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between mb-12">
            <div className="flex items-start gap-2 mb-8 md:mb-0">
              <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
              <h1 className="text-base font-bold md:text-2xl text-white">
                Identity 3
              </h1>
            </div>
            {/* <div className="mb-8 md:mb-0">
              <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
              <span>Identity 3</span>
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full md:w-auto">
              <div>
                <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
                  Services
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      to="/features"
                      className="text-gray-400 hover:text-white transition"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/solutions"
                      className="text-gray-400 hover:text-white transition"
                    >
                      Solutions
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/testimonials"
                      className="text-gray-400 hover:text-white transition"
                    >
                      Testimonials
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/faq"
                      className="text-gray-400 hover:text-white transition"
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
                  Company
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      to="/about"
                      className="text-gray-400 hover:text-white transition"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className="text-gray-400 hover:text-white transition"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy-policy"
                      className="text-gray-400 hover:text-white transition"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms"
                      className="text-gray-400 hover:text-white transition"
                    >
                      Terms of Use
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="text-gray-400 hover:text-white transition"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">
                  Social
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition"
                    >
                      Youtube
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition"
                    >
                      X (Twitter)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Inno. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
