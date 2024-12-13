import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogCard, { BlogPost } from "../components/BlogCard";

const featuredPosts: BlogPost[] = [
  {
    id: "ai-healthcare",
    slug: "ai-healthcare",
    title: "How AI is Revolutionizing Healthcare",
    excerpt: "Discover how artificial intelligence is transforming medical diagnosis, treatment planning, and patient care.",
    date: "2024-02-20",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  },
  {
    id: "machine-learning-guide",
    slug: "machine-learning-guide",
    title: "What is Machine Learning? A Beginner's Guide",
    excerpt: "Learn the fundamentals of machine learning and how it's shaping the future of technology.",
    date: "2024-02-19",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  },
  {
    id: "ai-ethics",
    slug: "ai-ethics",
    title: "Ethical Dilemmas in Artificial Intelligence",
    excerpt: "Exploring the moral implications and challenges of AI development and deployment.",
    date: "2024-02-18",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="bg-primary py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to The AI Frontier
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Exploring the latest advancements in artificial intelligence and their impact on our world.
            </p>
            <Link
              to="/blog"
              className="inline-block bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
            >
              Explore Articles
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;