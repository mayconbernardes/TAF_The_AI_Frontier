import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, LayoutDashboard, Users, Mail } from "lucide-react";

interface StatsProps {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalMessages: number;
  unreadMessages: number;
}

const AdminStats = ({
  totalPosts,
  publishedPosts,
  draftPosts,
  totalMessages,
  unreadMessages,
}: StatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPosts}</div>
          <p className="text-xs text-muted-foreground">All blog posts</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Published</CardTitle>
          <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{publishedPosts}</div>
          <p className="text-xs text-muted-foreground">Live on your blog</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Drafts</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{draftPosts}</div>
          <p className="text-xs text-muted-foreground">Unpublished posts</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Messages</CardTitle>
          <Mail className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {unreadMessages}/{totalMessages}
          </div>
          <p className="text-xs text-muted-foreground">Unread/Total messages</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;