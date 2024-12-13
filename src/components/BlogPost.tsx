import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "./Header";
import Footer from "./Footer";
import { Skeleton } from "./ui/skeleton";

const BlogPost = () => {
  const { id: slug } = useParams();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center text-red-500">
            Failed to load blog post. Please try again later.
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        {isLoading ? (
          <div className="space-y-8">
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-48 mx-auto" />
            <Skeleton className="h-96 w-full" />
          </div>
        ) : post ? (
          <>
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              {post.title}
            </h1>
            <time className="block text-center text-gray-600 mb-12">
              {new Date(post.published_at || "").toLocaleDateString()}
            </time>
            {post.image_url && (
              <div className="mb-12">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-[400px] object-cover rounded-xl shadow-lg"
                />
              </div>
            )}
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </>
        ) : (
          <div className="text-center text-gray-600">
            Blog post not found.
          </div>
        )}
      </article>
      <Footer />
    </div>
  );
};

export default BlogPost;