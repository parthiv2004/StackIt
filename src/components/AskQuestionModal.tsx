import { useState } from "react";
import { X, Tag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RichTextEditor } from "./RichTextEditor";
import { useToast } from "@/hooks/use-toast";

interface AskQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: unknown;
}

export const AskQuestionModal = ({
  isOpen,
  onClose,
  user,
}: AskQuestionModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const { toast } = useToast();

  const popularTags = [
    "React",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Python",
    "CSS",
    "HTML",
    "Express",
    "MongoDB",
    "SQL",
  ];

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 5) {
      setTags([...tags, trimmedTag]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to ask a question.",
        variant: "destructive",
      });
      return;
    }

    if (!title.trim() || !description.trim() || tags.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and add at least one tag.",
        variant: "destructive",
      });
      return;
    }

    // Mock submission
    toast({
      title: "Question posted!",
      description: "Your question has been posted successfully.",
    });

    // Reset form
    setTitle("");
    setDescription("");
    setTags([]);
    setCurrentTag("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Ask a Question
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-base font-semibold">
              Title
            </Label>
            <p className="text-sm text-gray-600 mb-2">
              Be specific and imagine you're asking a question to another person
            </p>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. How to handle state management in React applications?"
              className="text-base"
            />
          </div>

          <div>
            <Label className="text-base font-semibold">Description</Label>
            <p className="text-sm text-gray-600 mb-2">
              Include all the information someone would need to answer your
              question
            </p>
            <RichTextEditor
              value={description}
              onChange={setDescription}
              placeholder="Provide details about your problem, what you've tried, and what you're expecting to happen..."
            />
          </div>

          <div>
            <Label className="text-base font-semibold">Tags</Label>
            <p className="text-sm text-gray-600 mb-2">
              Add up to 5 tags to describe what your question is about
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-sm">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>

            <div className="flex space-x-2 mb-3">
              <Input
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag(currentTag);
                  }
                }}
                placeholder="Add a tag..."
                className="flex-1"
              />
              <Button
                type="button"
                onClick={() => addTag(currentTag)}
                disabled={!currentTag.trim() || tags.length >= 5}
              >
                Add
              </Button>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Popular tags:</p>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Button
                    key={tag}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addTag(tag)}
                    disabled={tags.includes(tag) || tags.length >= 5}
                    className="text-sm"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={!title.trim() || !description.trim() || tags.length === 0}
          >
            Post Question
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
