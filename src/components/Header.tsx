import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary-foreground hover:text-accent transition-colors">
          TAF
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <Link to="/about" className="hover:text-accent transition-colors">About</Link>
          <Link to="/blog" className="hover:text-accent transition-colors">Blog</Link>
          <Link to="/contact" className="hover:text-accent transition-colors">Contact</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;