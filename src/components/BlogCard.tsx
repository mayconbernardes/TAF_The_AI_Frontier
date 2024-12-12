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
    <article className="rounded-lg border bg-card overflow-hidden hover:shadow-lg transition-shadow">
      <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <time className="text-sm text-muted-foreground">{post.date}</time>
        <h3 className="text-xl font-bold mt-2 mb-3">
          <Link to={`/blog/${post.id}`} className="hover:text-accent transition-colors">
            {post.title}
          </Link>
        </h3>
        <p className="text-muted-foreground">{post.excerpt}</p>
      </div>
    </article>
  );
};

export default BlogCard;