import { Link } from "react-router-dom";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <article className="group bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in">
      <div className="relative overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <time className="text-sm text-muted-foreground font-medium">
          {post.date}
        </time>
        <h3 className="text-xl font-bold mt-2 mb-3 group-hover:text-purple-600 transition-colors">
          <Link to={`/blog/${post.id}`} className="hover:text-accent transition-colors">
            {post.title}
          </Link>
        </h3>
        <p className="text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>
        <Link 
          to={`/blog/${post.id}`} 
          className="inline-flex items-center mt-4 text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;