import React from "react";
import { Footer } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import {BsFacebook,BsInstagram,BsGithub,BsLinkedin} from "react-icons/bs"

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white "
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Ravishka's
              </span>
              Blog
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title="about" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.100jsprojects.com"
                  //new window
                  target="_blank"
                  //when this on it dont block by the browser
                  rel="noopener noreferrer"
                >
                  100 js project
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  //new window
                  target="_blank"
                  //when this on it dont block by the browser
                  rel="noopener noreferrer"
                >
                  Ravishka's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/RND036"
                  //new window
                  target="_blank"
                  //when this on it dont block by the browser
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href='http://www.linkedin.com/in/ravishka-dissanayaka-630263281'
                  //new window
                  target="_blank"
                  //when this on it dont block by the browser
                  rel="noopener noreferrer"
                >
                  Linked In
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="#"
                  //new window
                  target="_blank"
                  //when this on it dont block by the browser
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link
                  href='#'
                  //new window
                  target="_blank"
                  //when this on it dont block by the browser
                  rel="noopener noreferrer"
                >
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider/>
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          {/*to get the year using js*/}
          <Footer.Copyright href="#" by="Ravishka's Blog"  year={new Date().getFullYear()}/>
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook}/>
            <Footer.Icon href="#" icon={BsInstagram}/>
            <Footer.Icon href="#" icon={BsGithub}/>
            <Footer.Icon href="#" icon={BsLinkedin}/>
          </div>
        </div>
      </div>
    </Footer>
  );
}
