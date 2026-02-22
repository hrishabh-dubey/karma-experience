import { type Feedback } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { MessageSquare, User } from "lucide-react";

interface FeedbackCardProps {
  feedback: Feedback;
  index: number;
}

export function FeedbackCard({ feedback, index }: FeedbackCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="parchment-card p-6 saffron-glow transition-all hover:-translate-y-1 hover:border-primary/30 flex flex-col gap-3 group"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full saffron-gradient flex items-center justify-center text-white font-bold shadow-md border-2 border-white/20">
            {feedback.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-bold text-lg text-primary leading-tight">
              {feedback.name}
            </h3>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
              {formatDistanceToNow(new Date(feedback.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <div className="text-primary/10 group-hover:text-primary/30 transition-colors">
          <MessageSquare className="w-6 h-6" />
        </div>
      </div>
      
      <div className="mt-2 text-foreground/90 text-sm leading-relaxed italic">
        "{feedback.message}"
      </div>
    </motion.div>
  );
}
