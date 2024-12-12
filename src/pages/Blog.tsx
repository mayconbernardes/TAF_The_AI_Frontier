import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import BlogCard from "@/components/BlogCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 py-16 mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 animate-fade-in">
            The AI Frontier Blog
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-2xl mx-auto animate-fade-in">
            Explore the latest insights, trends, and breakthroughs in artificial intelligence and technology.
          </p>
        </div>
      </div>
      <main className="container mx-auto px-4 pb-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-xl" />
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
                  date: new Date(post.published_at || "").toLocaleDateString(),
                  image: post.image_url || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
                }}
              />
            ))}
            {posts?.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground py-12">
                No published posts yet.
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Blog;