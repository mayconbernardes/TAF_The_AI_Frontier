import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import MessageDialog from "./MessageDialog";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string | null;
  is_read: boolean | null;
}

const MessagesSection = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: messages, isLoading: messagesLoading } = useQuery({
    queryKey: ["contact-messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Message[];
    },
  });

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
    setDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Messages</CardTitle>
      </CardHeader>
      <CardContent>
        {messagesLoading ? (
          <p>Loading messages...</p>
        ) : (
          <div className="relative w-full overflow-auto max-h-[600px]">
            <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages?.map((message) => (
                  <TableRow
                    key={message.id}
                    className={`${
                      !message.is_read ? "bg-muted/50" : ""
                    } cursor-pointer hover:bg-muted/70 transition-colors`}
                    onClick={() => handleMessageClick(message)}
                  >
                    <TableCell>{message.name}</TableCell>
                    <TableCell>{message.email}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {message.message}
                    </TableCell>
                    <TableCell>
                      {format(new Date(message.created_at || ""), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`text-sm ${
                          message.is_read
                            ? "text-muted-foreground"
                            : "text-primary font-medium"
                        }`}
                      >
                        {message.is_read ? "Read" : "Unread"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      <MessageDialog
        message={selectedMessage}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </Card>
  );
};

export default MessagesSection;