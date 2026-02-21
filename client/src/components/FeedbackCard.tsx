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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 card-hover flex flex-col gap-3 group"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-indigo-600 font-bold shadow-inner">
            {feedback.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 leading-tight">
              {feedback.name}
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              {formatDistanceToNow(new Date(feedback.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <div className="text-slate-300 group-hover:text-indigo-200 transition-colors">
          <MessageSquare className="w-5 h-5" />
        </div>
      </div>
      
      <div className="mt-2 text-slate-600 text-sm leading-relaxed">
        {feedback.message}
      </div>
    </motion.div>
  );
}
