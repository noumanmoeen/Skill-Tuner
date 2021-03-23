import React, { Component } from "react";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <footer className="footer-1 bg-white py-8 sm:py-12">
          <div className="container mx-auto px-4">
            <div className="sm:flex sm:flex-wrap sm:-mx-4 md:py-4">
              <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6">
                <h5 className="text-xl font-bold mb-6">Features</h5>
                <ul className="list-none footer-links">
                  <li className="mb-2">
                    <a
                      href="#"
                      className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                    >
                      Cool stuff
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                    >
                      Random feature
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                    >
                      Team feature
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                    >
                      Stuff for developers
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                    >
                      Another one
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                    >
                      Last time
                    </a>
                  </li>
                </ul>
              </div>
              <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 sm:mt-0">
                <h5 className="text-xl font-bold mb-6">Resources</h5>
                <ul className="list-none footer-links">
                  <li className="mb-2">
                    <a
                      href="#"
                      className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                    >
                      Resource
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                    >
                      Resource name
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                    >
                      Another resource
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                    >
                      Final resource
                    </a>
                  </li>
                </ul>
              </div>
              <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 md:mt-0">
                <h5 className="text-xl font-bold mb-6">About</h5>
                <ul className="list-none footer-links">
                  <li className="mb-2">
                    <a
                      href="#"
                      className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                    >
                      Team
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                    >
                      Locations
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                    >
                      Privacy
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                    >
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
              <div className="px-4 sm:w-1/2 md:w-1/4 xl:w-1/6 mt-8 md:mt-0">
                <h5 className="text-xl font-bold mb-6">Help</h5>
                <ul className="list-none footer-links">
                  <li className="mb-2">
                    <a
                      href="#"
                      className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                    >
                      Support
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                    >
                      Help Center
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="border-b border-solid border-transparent hover:border-purple-800 hover:text-purple-800"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              <div className="px-4 mt-4 sm:w-1/3 xl:w-1/6 sm:mx-auto xl:mt-0 xl:ml-auto">
                <h5 className="text-xl font-bold mb-6 sm:text-center xl:text-left">
                  Stay connected
                </h5>
                <div className="flex sm:justify-center xl:justify-start">
                  <a
                    href
                    className="w-8 h-8 border border-2 border-gray-400 rounded-full text-center py-1 text-gray-600 hover:text-white hover:bg-blue-600 hover:border-blue-600"
                  >
                    <i className="fab fa-facebook" />
                  </a>
                  <a
                    href
                    className="w-8 h-8 border border-2 border-gray-400 rounded-full text-center py-1 ml-2 text-gray-600 hover:text-white hover:bg-blue-400 hover:border-blue-400"
                  >
                    <i className="fab fa-twitter" />
                  </a>
                  <a
                    href
                    className="w-8 h-8 border border-2 border-gray-400 rounded-full text-center py-1 ml-2 text-gray-600 hover:text-white hover:bg-red-600 hover:border-red-600"
                  >
                    <i className="fab fa-google-plus-g" />
                  </a>
                </div>
              </div>
            </div>
            <hr />
            <div className="mt-2">© Copyright 2020. All Rights Reserved.</div>
          </div>
        </footer>
      </>
    );
  }
}

export default Footer;
