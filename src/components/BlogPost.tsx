import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BlogPost = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["blog-post", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .eq("is_published", true)
        .single();

      if (error) {
        toast({
          title: "Error loading post",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

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
      {isLoading ? (
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto space-y-8">
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-48 mx-auto" />
            <Skeleton className="h-64 w-full rounded-xl" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </main>
      ) : (
        <main className="container mx-auto px-4 py-16">
          <article className="max-w-3xl mx-auto">
            <header className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                {post?.title}
              </h1>
              <time className="text-muted-foreground">
                {new Date(post?.published_at || "").toLocaleDateString()}
              </time>
            </header>
            {post?.image_url && (
              <div className="mb-12 rounded-xl overflow-hidden shadow-lg animate-fade-in">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            )}
            <div 
              className="prose prose-lg max-w-none blog-content animate-fade-in"
              dangerouslySetInnerHTML={{ __html: post?.content || "" }}
            />
          </article>
        </main>
      )}
      <Footer />
    </div>
  );
};

export default BlogPost;