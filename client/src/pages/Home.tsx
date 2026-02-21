import { useFeedback } from "@/hooks/use-feedback";
import { FeedbackForm } from "@/components/FeedbackForm";
import { FeedbackCard } from "@/components/FeedbackCard";
import { Header } from "@/components/Header";
import { motion } from "framer-motion";
import { MessageSquareDashed } from "lucide-react";

export default function Home() {
  const { data: feedbacks, isLoading, error } = useFeedback();

  // Sort by newest first
  const sortedFeedbacks = feedbacks?.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/10 selection:text-primary">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col gap-12">
          
          {/* Centered Form */}
          <div className="w-full max-w-xl mx-auto">
            <FeedbackForm />
          </div>

          {/* Feedback Feed Below */}
          <div className="w-full">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Community Feedback
              </h2>
              <p className="text-muted-foreground mt-2 text-lg">
                See the journey of others with The Karma Compass.
              </p>
            </div>

            {isLoading ? (
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 bg-white rounded-xl animate-pulse shadow-sm border border-border p-6">
                    <div className="flex gap-4">
                      <div className="h-10 w-10 bg-muted rounded-full"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-1/4"></div>
                        <div className="h-4 bg-muted rounded w-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="p-8 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-center font-medium">
                Failed to load feedback. Please try again later.
              </div>
            ) : sortedFeedbacks?.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-border">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground/30">
                  <MessageSquareDashed className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-foreground">No feedback yet</h3>
                <p className="text-muted-foreground mt-1">Be the first to share your thoughts!</p>
              </div>
            ) : (
              <div className="max-h-[600px] overflow-y-auto pr-4 space-y-6 scrollbar-thin scrollbar-thumb-primary/20 hover:scrollbar-thumb-primary/40 transition-colors">
                {sortedFeedbacks?.map((feedback, index) => (
                  <FeedbackCard 
                    key={feedback.id} 
                    feedback={feedback} 
                    index={index} 
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
      
      {/* Decorative background blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
      </div>
    </div>
  );
}
