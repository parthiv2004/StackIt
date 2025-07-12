
import { Bell, Check, MessageCircle, Heart, AtSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NotificationDropdownProps {
  onClose: () => void;
}

export const NotificationDropdown = ({ onClose }: NotificationDropdownProps) => {
  const notifications = [
    {
      id: 1,
      type: "answer",
      message: "John Doe answered your question about React hooks",
      time: "2 minutes ago",
      unread: true,
      icon: MessageCircle,
    },
    {
      id: 2,
      type: "mention",
      message: "Sarah mentioned you in a comment",
      time: "1 hour ago",
      unread: true,
      icon: AtSign,
    },
    {
      id: 3,
      type: "vote",
      message: "Your answer received 5 upvotes",
      time: "3 hours ago",
      unread: true,
      icon: Heart,
    },
    {
      id: 4,
      type: "answer",
      message: "Mike answered your question about TypeScript",
      time: "1 day ago",
      unread: false,
      icon: MessageCircle,
    },
  ];

  return (
    <div className="absolute right-0 top-full mt-2 w-96 z-50">
      <Card className="p-0 shadow-lg border">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            <Button variant="ghost" size="sm">
              <Check className="h-4 w-4 mr-1" />
              Mark all read
            </Button>
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <div
                key={notification.id}
                className={`p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer ${
                  notification.unread ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${
                    notification.type === "answer" ? "bg-green-100 text-green-600" :
                    notification.type === "mention" ? "bg-blue-100 text-blue-600" :
                    "bg-red-100 text-red-600"
                  }`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                  {notification.unread && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="p-3 border-t bg-gray-50">
          <Button variant="ghost" size="sm" className="w-full text-sm">
            View all notifications
          </Button>
        </div>
      </Card>
    </div>
  );
};
