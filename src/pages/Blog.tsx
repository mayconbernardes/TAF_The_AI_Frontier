import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import BlogCard from "@/components/BlogCard";
import Header from "@/components/Header";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const Blog = () => {
  const { toast } = useToast();

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });

      if (error) {
        toast({
          title: "Error loading posts",
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
            Failed to load blog posts. Please try again later.
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts?.map((post) => (
              <BlogCard
                key={post.id}
                post={{
                  id: post.id,
                  title: post.title,
                  excerpt: post.excerpt || "",
                  date: new Date(post.published_at).toLocaleDateString(),
                  image: post.image_url || "/placeholder.svg",
                }}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Blog;