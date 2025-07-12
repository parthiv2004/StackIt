
import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, MessageSquare, Eye, Clock, Tag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuestionDetailModal } from "./QuestionDetailModal";

interface Question {
  id: number;
  title: string;
  description: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
  votes: number;
  answers: number;
  views: number;
  tags: string[];
  hasAcceptedAnswer: boolean;
}

interface QuestionListProps {
  searchQuery: string;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

export const QuestionList = ({ searchQuery, selectedTags, onTagsChange }: QuestionListProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [sortBy, setSortBy] = useState<"newest" | "votes" | "activity">("newest");

  // Mock data
  useEffect(() => {
    const mockQuestions: Question[] = [
      {
        id: 1,
        title: "How to handle state management in React applications?",
        description: "I'm building a large React application and struggling with state management. Should I use Redux, Context API, or something else?",
        author: "Alice Johnson",
        authorAvatar: "AJ",
        createdAt: "2024-01-15T10:30:00Z",
        votes: 15,
        answers: 3,
        views: 120,
        tags: ["React", "JavaScript", "State Management"],
        hasAcceptedAnswer: true,
      },
      {
        id: 2,
        title: "TypeScript generic constraints with conditional types",
        description: "I'm trying to create a utility type that conditionally applies constraints based on input types. How can I achieve this?",
        author: "Bob Smith",
        authorAvatar: "BS",
        createdAt: "2024-01-14T15:45:00Z",
        votes: 8,
        answers: 1,
        views: 85,
        tags: ["TypeScript", "Generics", "Types"],
        hasAcceptedAnswer: false,
      },
      {
        id: 3,
        title: "Best practices for Node.js API error handling",
        description: "What are the recommended patterns for handling errors in Express.js applications? Should I use try-catch blocks everywhere?",
        author: "Carol Davis",
        authorAvatar: "CD",
        createdAt: "2024-01-13T09:20:00Z",
        votes: 22,
        answers: 5,
        views: 200,
        tags: ["Node.js", "Express", "Error Handling"],
        hasAcceptedAnswer: true,
      },
      {
        id: 4,
        title: "CSS Grid vs Flexbox: When to use which?",
        description: "I'm always confused about when to use CSS Grid versus Flexbox. Can someone explain the key differences and use cases?",
        author: "David Wilson",
        authorAvatar: "DW",
        createdAt: "2024-01-12T14:10:00Z",
        votes: 31,
        answers: 7,
        views: 350,
        tags: ["CSS", "Layout", "Grid", "Flexbox"],
        hasAcceptedAnswer: true,
      },
    ];
    setQuestions(mockQuestions);
  }, []);

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = searchQuery === "" || 
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 ||
      selectedTags.some(tag => question.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case "votes":
        return b.votes - a.votes;
      case "activity":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Questions ({filteredQuestions.length})
        </h1>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={sortBy === "newest" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("newest")}
          >
            Newest
          </Button>
          <Button
            variant={sortBy === "votes" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("votes")}
          >
            Most Votes
          </Button>
          <Button
            variant={sortBy === "activity" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("activity")}
          >
            Active
          </Button>
        </div>
      </div>

      {selectedTags.length > 0 && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Filtered by:</span>
          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => onTagsChange(selectedTags.filter(t => t !== tag))}
            >
              {tag} ×
            </Badge>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {sortedQuestions.map((question) => (
          <Card
            key={question.id}
            className="p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedQuestion(question)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex flex-col items-center space-y-1 text-gray-500">
                    <div className="flex items-center space-x-1">
                      <ArrowUp className="h-4 w-4" />
                      <span className="text-sm font-medium">{question.votes}</span>
                    </div>
                    <span className="text-xs">votes</span>
                  </div>
                  
                  <div className={`flex flex-col items-center space-y-1 ${
                    question.hasAcceptedAnswer ? "text-green-600" : "text-gray-500"
                  }`}>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4" />
                      <span className="text-sm font-medium">{question.answers}</span>
                    </div>
                    <span className="text-xs">answers</span>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-1 text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm font-medium">{question.views}</span>
                    </div>
                    <span className="text-xs">views</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-blue-600 hover:text-blue-800 mb-2">
                  {question.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {question.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {question.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer hover:bg-blue-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!selectedTags.includes(tag)) {
                            onTagsChange([...selectedTags, tag]);
                          }
                        }}
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-3 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                        {question.authorAvatar}
                      </div>
                      <span>{question.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatTimeAgo(question.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {selectedQuestion && (
        <QuestionDetailModal
          question={selectedQuestion}
          isOpen={!!selectedQuestion}
          onClose={() => setSelectedQuestion(null)}
        />
      )}
    </div>
  );
};
