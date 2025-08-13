import { Link } from "react-router-dom"

export default function Nav() {
  const linkStyle = { marginRight: 12 }
  return (
    <nav style={{ padding: 12, borderBottom: "1px solid #eee" }}>
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/settings" style={linkStyle}>Settings</Link>
      <Link to="/profile" style={linkStyle}>Profile</Link>
      <Link to="/login" style={linkStyle}>Login</Link>
    </nav>
  )
}