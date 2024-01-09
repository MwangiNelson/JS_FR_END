import { useContext } from "react";
import { IconButton } from "./buttons";
import { GiAstronautHelmet, GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineSupervisedUserCircle } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../contexts/AppContexts";

function Navbar() {
  const location = useLocation();
  const path = location.pathname;

  const { userData, logout } = useContext(AppContext)
  return (
    <nav
      className={`w-full ${path == "/chat" ? "hidden" : "flex"
        } flex-row bg-cream py-4 border-b-[1px] border-b-slate-400 justify-between px-10 items-center`}
    >
      <div className="lg:w-2/12 md:w-4/12 w-1/2">
        <a href="/">
          <img
            src="/images/nutri_logo.png"
            className="w-full h-[7vh] object-contain md:object-cover "
            alt=""
          />
        </a>
      </div>
      <div className="flex-row gap-10 lg:flex hidden">
        <h4 className="text-md text-dull font-medium">Community</h4>
        <h4 className="text-md font-medium">About</h4>
        <h4 className="text-md font-medium">Features</h4>
      </div>

      <div className="flex flex-row justify-between gap-5 items-center">
        <div className="lg:hidden flex ">
          <IconButton
            Icon={GiHamburgerMenu}
            text=""
            backgroundColor="bg-purple-800"
            textStyle="text-white"
          />
        </div>
        {
          userData ? <div className="flex flex-col w-full pe-24 me-10 dropdown">
            <img src="/images/profile.jpg" tabindex="0" role="button" className='w-14 h-14 rounded-full object-cover' alt="" />
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box -translate-x-[3.5vw] translate-y-[7vh] w-52 top-0 bottom-0">
              <li><a onClick={logout} className="text-center">Logout</a></li>

            </ul>
          </div>
            : <div className="md:flex flex-row gap-3 items-center justify-between hidden">
              <Link to="/chat">
                <IconButton
                  Icon={GiAstronautHelmet}
                  backgroundColor="bg-gray-800"
                  text="Start Chat"
                  textStyle="text-white"
                />
              </Link>
              <Link to="/auth">
                <IconButton
                  Icon={MdOutlineSupervisedUserCircle}
                  backgroundColor="bg-blue-600"
                  text="Sign In"
                  textStyle="text-white"
                />
              </Link>
            </div>

        }
      </div>
    </nav>
  );
}

export default Navbar;
