// menu lateral fixo

import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
       <ul>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Profile</a></li>
        <li><a href="#">Settings</a></li>
        <li><a href="#">Logout</a></li>
      </ul>
    </aside>
  )
}
