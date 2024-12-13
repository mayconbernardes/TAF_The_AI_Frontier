import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import CreatePostButton from "@/components/CreatePostButton";
import AdminBlogList from "@/components/AdminBlogList";
import AdminStats from "@/components/AdminStats";
import MessagesSection from "@/components/MessagesSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  const { data: posts, isLoading: postsLoading, error: postsError } = useQuery({
    queryKey: ["admin-blog-posts"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("author_id", session.user.id)
        .order("updated_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const { data: messages } = useQuery({
    queryKey: ["contact-messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const publishedPosts = posts?.filter(post => post.is_published)?.length || 0;
  const draftPosts = posts?.filter(post => !post.is_published)?.length || 0;
  const totalMessages = messages?.length || 0;
  const unreadMessages = messages?.filter(msg => !msg.is_read)?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your blog posts and content</p>
          </div>
          <CreatePostButton />
        </div>

        <AdminStats
          totalPosts={posts?.length || 0}
          publishedPosts={publishedPosts}
          draftPosts={draftPosts}
          totalMessages={totalMessages}
          unreadMessages={unreadMessages}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Blog Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <AdminBlogList
                posts={posts || []}
                isLoading={postsLoading}
                error={postsError}
              />
            </CardContent>
          </Card>

          <MessagesSection />
        </div>
      </main>
    </div>
  );
};

export default Admin;