import { Link } from "react-router-dom";
import { Brain } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-2xl font-bold text-primary-foreground hover:text-accent transition-colors"
          aria-label="TAF - The AI Frontier"
        >
          <div className="relative">
            <Brain className="w-8 h-8 text-accent animate-pulse" />
            <div className="absolute inset-0 bg-accent/20 blur-lg rounded-full"></div>
          </div>
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            TAF
          </span>
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