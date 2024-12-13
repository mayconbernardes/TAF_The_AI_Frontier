import { useState } from "react";
import { Link } from "react-router-dom";
import { PenIcon, Trash2Icon, EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  is_published: boolean;
  published_at: string;
  image_url: string;
}

interface AdminBlogListProps {
  posts: Post[];
  isLoading: boolean;
  error: Error | null;
}

const AdminBlogList = ({ posts, isLoading, error }: AdminBlogListProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState<Partial<Post>>({});

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

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setEditedPost(post);
    setIsEditing(true);
  };

  const handleView = (post: Post) => {
    setSelectedPost(post);
    setIsEditing(false);
  };

  const handleUpdate = async () => {
    if (!selectedPost) return;

    const { error } = await supabase
      .from("blog_posts")
      .update({
        title: editedPost.title,
        content: editedPost.content,
        excerpt: editedPost.excerpt,
        is_published: editedPost.is_published,
        image_url: editedPost.image_url,
      })
      .eq("id", selectedPost.id);

    if (error) {
      toast({
        title: "Error updating post",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Post updated",
      description: "The post has been successfully updated.",
    });

    queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
    setSelectedPost(null);
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
            <Button variant="outline" size="icon" onClick={() => handleView(post)}>
              <EyeIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handleEdit(post)}>
              <PenIcon className="h-4 w-4" />
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

      <Sheet
        open={selectedPost !== null}
        onOpenChange={(open) => !open && setSelectedPost(null)}
      >
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {isEditing ? "Edit Post" : "View Post"}
            </SheetTitle>
          </SheetHeader>
          <div className="space-y-6 mt-6">
            {isEditing ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editedPost.title || ""}
                    onChange={(e) =>
                      setEditedPost({ ...editedPost, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={editedPost.excerpt || ""}
                    onChange={(e) =>
                      setEditedPost({ ...editedPost, excerpt: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={editedPost.content || ""}
                    onChange={(e) =>
                      setEditedPost({ ...editedPost, content: e.target.value })
                    }
                    className="h-40"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={editedPost.image_url || ""}
                    onChange={(e) =>
                      setEditedPost({ ...editedPost, image_url: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="published">Published</Label>
                    <p className="text-sm text-muted-foreground">
                      Make this post visible to everyone
                    </p>
                  </div>
                  <Switch
                    id="published"
                    checked={editedPost.is_published}
                    onCheckedChange={(checked) =>
                      setEditedPost({ ...editedPost, is_published: checked })
                    }
                  />
                </div>
                <Button onClick={handleUpdate} className="w-full">
                  Save Changes
                </Button>
              </>
            ) : (
              <div className="space-y-6">
                <div>
                  <Label>Title</Label>
                  <p className="mt-1">{selectedPost?.title}</p>
                </div>
                <div>
                  <Label>Excerpt</Label>
                  <p className="mt-1">{selectedPost?.excerpt}</p>
                </div>
                <div>
                  <Label>Content</Label>
                  <div className="mt-1 prose max-w-none">
                    {selectedPost?.content}
                  </div>
                </div>
                <div>
                  <Label>Status</Label>
                  <p className="mt-1">
                    {selectedPost?.is_published ? "Published" : "Draft"}
                  </p>
                </div>
                <Button onClick={() => handleEdit(selectedPost!)} className="w-full">
                  Edit Post
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminBlogList;