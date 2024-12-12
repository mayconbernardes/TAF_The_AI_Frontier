import { Link } from "react-router-dom";
import { PenIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface Post {
  id: string;
  title: string;
  is_published: boolean;
  published_at: string;
}

interface AdminBlogListProps {
  posts: Post[];
  isLoading: boolean;
  error: Error | null;
}

const AdminBlogList = ({ posts, isLoading, error }: AdminBlogListProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error deleting post",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Post deleted",
      description: "The post has been successfully deleted.",
    });

    queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
  };

  if (error) {
    return (
      <div className="text-center text-red-500">
        Failed to load posts. Please try again later.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16">
            <Skeleton className="h-full w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex items-center justify-between p-4 bg-card rounded-lg shadow"
        >
          <div>
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-sm text-muted-foreground">
              {post.is_published ? "Published" : "Draft"} •{" "}
              {new Date(post.published_at).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link to={`/admin/edit/${post.id}`}>
                <PenIcon className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDelete(post.id)}
            >
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      {posts.length === 0 && (
        <div className="text-center text-muted-foreground py-8">
          No posts yet. Create your first post!
        </div>
      )}
    </div>
  );
};

export default AdminBlogList;