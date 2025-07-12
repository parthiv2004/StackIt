import { useState } from "react";
import {
  X,
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Check,
  Clock,
  User,
  Tag,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { RichTextEditor } from "./RichTextEditor";

interface Answer {
  id: number;
  content: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
  votes: number;
  isAccepted: boolean;
}

interface Question {
  title: string;
  createdAt: string;
  author: string;
  views: number;
  description: string;
  tags: string[];
}

interface QuestionDetailModalProps {
  question: Question;
  isOpen: boolean;
  onClose: () => void;
}

export const QuestionDetailModal = ({
  question,
  isOpen,
  onClose,
}: QuestionDetailModalProps) => {
  const [answers] = useState<Answer[]>([
    {
      id: 1,
      content:
        "For large React applications, I'd recommend using Redux Toolkit (RTK) as it provides excellent developer experience and is the official recommended way to use Redux. Here's why:\n\n• **Simplified Setup**: RTK reduces boilerplate significantly\n• **Built-in Best Practices**: Includes Immer for immutable updates\n• **DevTools Integration**: Excellent debugging capabilities\n• **TypeScript Support**: First-class TypeScript support",
      author: "Tech Expert",
      authorAvatar: "TE",
      createdAt: "2024-01-15T11:30:00Z",
      votes: 12,
      isAccepted: true,
    },
    {
      id: 2,
      content:
        "Context API is great for smaller applications or when you need to share data between components that don't change frequently. However, for complex state management, Redux is still the gold standard.",
      author: "React Developer",
      authorAvatar: "RD",
      createdAt: "2024-01-15T12:15:00Z",
      votes: 5,
      isAccepted: false,
    },
  ]);

  const [newAnswer, setNewAnswer] = useState("");
  const [userVote, setUserVote] = useState<{
    [key: number]: "up" | "down" | null;
  }>({});

  const handleVote = (answerId: number, voteType: "up" | "down") => {
    setUserVote((prev) => ({
      ...prev,
      [answerId]: prev[answerId] === voteType ? null : voteType,
    }));
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {question.title}
              </h2>

              <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Asked {formatTimeAgo(question.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>by {question.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{question.views} views</span>
                </div>
              </div>

              <div className="prose max-w-none mb-4">
                <p className="text-gray-700">{question.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {question.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {answers.length} Answer{answers.length !== 1 ? "s" : ""}
            </h3>

            <div className="space-y-6">
              {answers.map((answer) => (
                <Card
                  key={answer.id}
                  className={`p-6 ${
                    answer.isAccepted ? "border-green-200 bg-green-50" : ""
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex flex-col items-center space-y-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleVote(answer.id, "up")}
                        className={
                          userVote[answer.id] === "up" ? "text-green-600" : ""
                        }
                      >
                        <ArrowUp className="h-5 w-5" />
                      </Button>
                      <span className="font-semibold">{answer.votes}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleVote(answer.id, "down")}
                        className={
                          userVote[answer.id] === "down" ? "text-red-600" : ""
                        }
                      >
                        <ArrowDown className="h-5 w-5" />
                      </Button>
                      {answer.isAccepted && (
                        <div className="p-2 bg-green-100 rounded-full">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="prose max-w-none mb-4">
                        <div className="whitespace-pre-line text-gray-700">
                          {answer.content}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                            {answer.authorAvatar}
                          </div>
                          <span>{answer.author}</span>
                          <span>•</span>
                          <span>{formatTimeAgo(answer.createdAt)}</span>
                        </div>

                        {answer.isAccepted && (
                          <Badge
                            variant="default"
                            className="bg-green-100 text-green-800"
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Accepted Answer
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Your Answer</h3>
            <div className="space-y-4">
              <RichTextEditor
                value={newAnswer}
                onChange={setNewAnswer}
                placeholder="Write your answer here..."
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                Post Your Answer
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
