import Link from "next/link";
import { Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RelatedTagsProps {
  tags: { id: string; name: string; slug: string }[];
}

const RelatedTags = ({ tags }: RelatedTagsProps) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 border-t pt-6">
      <span className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
        <Tag className="h-4 w-4" />
        Tags:
      </span>
      {tags.map((tag) => (
        <Link key={tag.id} href={`/search?tag=${tag.slug}`}>
          <Badge
            variant="outline"
            className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {tag.name}
          </Badge>
        </Link>
      ))}
    </div>
  );
};

export default RelatedTags;
