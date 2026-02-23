import { type Feedback } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface FeedbackCardProps {
  feedback: Feedback;
  index: number;
}

export function FeedbackCard({ feedback, index }: FeedbackCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Estimate if message is long (roughly > 200 chars or many lines)
  const isLongMessage = feedback.message.length > 250 || feedback.message.split('\n').length > 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="parchment-card-refined p-6 border-2 border-[#d4c49c]/30 hover:border-primary/20 relative group overflow-hidden"
    >
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#f39c12] to-[#e67e22] flex items-center justify-center text-white text-xl font-bold shadow-md border-2 border-white/30 flex-shrink-0">
          {feedback.name.charAt(0).toUpperCase()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-xl text-[#5c3d2e] truncate pr-4">
              {feedback.name}
            </h3>
            <MessageSquare className="w-5 h-5 text-[#c18c5d]/20 group-hover:text-[#c18c5d]/50 transition-colors flex-shrink-0" />
          </div>
          
          <p className="text-[11px] text-[#8b5e3c] font-bold uppercase tracking-widest mb-3">
            about {formatDistanceToNow(new Date(feedback.createdAt))} ago
          </p>
          
          <div className={`text-[#5c3d2e]/90 text-base leading-relaxed break-words ${!isExpanded ? 'line-clamp-4' : ''}`}>
            {feedback.message}
          </div>

          {isLongMessage && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-3 text-[#e67e22] font-bold text-sm flex items-center gap-1 hover:text-[#d35400] transition-colors"
            >
              {isExpanded ? (
                <>Show Less <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>Read More <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Small corner icon like in reference */}
      <div className="absolute bottom-2 right-2 opacity-[0.05]">
        <MessageSquare className="w-12 h-12" />
      </div>
    </motion.div>
  );
}
