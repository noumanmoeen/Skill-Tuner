import React, { Component } from "react";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <nav className="nav flex flex-wrap items-center justify-between px-4 shadow-sm">
          <div className="flex flex-no-shrink items-center mr-6 py-3 text-grey-darkest">
            <svg
              className="w-10 text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Layer_1"
              x="0px"
              y="0px"
              viewBox="0 0 225 225"
              fill="black"
              style={{ enableBackground: "new 0 0 225 225" }}
              xmlSpace="preserve"
            >
              <style
                type="text/css"
                dangerouslySetInnerHTML={{
                  __html:
                    "\n                                    .st0{fill:none;stroke:currentColor;stroke-width:20;stroke-linecap:round;stroke-miterlimit:3;}\n                                ",
                }}
              />
              <g transform="matrix( 1, 0, 0, 1, 0,0) ">
                <g>
                  <path
                    id="Layer0_0_1_STROKES"
                    className="st0"
                    d="M173.8,151.5l13.6-13.6 M35.4,89.9l29.1-29 M89.4,34.9v1 M137.4,187.9l-0.6-0.4     M36.6,138.7l0.2-0.2 M56.1,169.1l27.7-27.6 M63.8,111.5l74.3-74.4 M87.1,188.1L187.6,87.6 M110.8,114.5l57.8-57.8"
                  />
                </g>
              </g>
            </svg>
            <span className="font-semibold text-xl tracking-tight">
              Skill Tuner
            </span>
          </div>
          <input className="menu-btn hidden" type="checkbox" id="menu-btn" />
          <label
            className="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none"
            htmlFor="menu-btn"
          >
            <span className="navicon bg-grey-darkest flex items-center relative" />
          </label>
          <ul className="menu border-b md:border-none flex justify-end list-reset m-0 w-full md:w-auto">
            <li className="border-t md:border-none">
              <a
                href="/"
                className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker font-bold"
              >
                Home
              </a>
            </li>
            <li className="border-t md:border-none">
              <a
                href="/about/"
                className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"
              >
                About
              </a>
            </li>
            <li className="border-t md:border-none">
              <a
                href="/blog/"
                className="block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker"
              >
                Blog
              </a>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

export default Home;
