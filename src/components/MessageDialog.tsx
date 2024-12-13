import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string | null;
  is_read: boolean | null;
}

interface MessageDialogProps {
  message: Message | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MessageDialog = ({ message, open, onOpenChange }: MessageDialogProps) => {
  const queryClient = useQueryClient();

  const handleMarkAsRead = async () => {
    if (!message) return;

    const { error } = await supabase
      .from("contact_submissions")
      .update({ is_read: true })
      .eq("id", message.id);

    if (error) {
      toast.error("Failed to mark message as read");
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
    toast.success("Message marked as read");
  };

  if (!message) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Message from {message.name}</DialogTitle>
          <DialogDescription>
            Received on {format(new Date(message.created_at || ""), "PPP 'at' pp")}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email:</label>
            <p className="text-sm">{message.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium">Message:</label>
            <p className="text-sm whitespace-pre-wrap">{message.message}</p>
          </div>
          {!message.is_read && (
            <Button onClick={handleMarkAsRead} className="w-full">
              Mark as Read
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDialog;