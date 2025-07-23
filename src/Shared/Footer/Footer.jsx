import { FaPhone, FaEnvelope, FaGithub, FaFacebookSquare, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-100 to-secondary text-gray-800 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + Slogan */}
        <div>
          <Logo></Logo>
          <p className="mt-2 text-sm">Bringing healthcare closer to communities through mobile medical camps.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/availableCamps" className="hover:text-primary">Available Camps</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="flex items-center gap-2 text-sm"><FaPhone /> +8801XXXXXXXXX</p>
          <p className="flex items-center gap-2 text-sm"><FaEnvelope /> info@medcamp.com</p>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a href="https://www.facebook.com/share/1LL4u1yggP/" className="text-blue-600 hover:text-blue-800"><FaFacebookSquare size={24}/></a>
            <a href="https://github.com/sujanchakma1" className="hover:text-black"><FaGithub size={24}/></a>
            <a href="www.linkedin.com/in/sujan99" className="text-blue-700 hover:text-blue-900"><FaLinkedin size={24}/></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 text-center text-sm text-gray-800 pt-4">
        © {new Date().getFullYear()} MedCamp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
