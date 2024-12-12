import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to Our Blog</h1>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link to="/blog">View Blog Posts</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/admin">Admin Dashboard</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Index;