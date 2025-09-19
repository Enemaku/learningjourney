import { Link, useLocation } from "react-router-dom"

import { useState } from "react"
import SideBar from "./SideBar";
import { faHome, faList, faCog} from "@fortawesome/free-solid-svg-icons"

export default function Navbar() {

  const location = useLocation();

  const [showSidebar, setShowSidebar] = useState(false)
  const links = [
    {
      name: "Home",
      path: "/",
      icon: faHome
    },
    {
      name: "Recipes",
      path: "/recipes",
      icon: faList
    },
    {
      name: "Settings",
      path: "/settings",
      icon: faCog
    }
  ]

  function closeSidebar() {
    setShowSidebar(false)
  }
  return (
    <>
      <div className="navbar container">
        <Link to="/" className="logo">F<span>oo</span>diesHub</Link>
        <div className="nav-links">
          {links.map(link => (
            <Link className={location.pathname === Link.path ? "active" : ""} to={link.path} key={link.name}>{link.name}</Link>
          ))}
          {/* <a href="#!">Home</a>
        <a href="#!">Recipes</a>
        <a href="#!">Settings</a> */}
        </div>
        <div onClick={() => setShowSidebar(true)} className={showSidebar ? "sidebar-btn active" : "sidebar-btn"}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
      {showSidebar && <SideBar close={closeSidebar} links={links} />}
    </>
  )
}