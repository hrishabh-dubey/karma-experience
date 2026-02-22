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
    <div className="h-screen bg-background relative overflow-hidden flex flex-col">
      <Header />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 py-8 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-10 h-full">
          
          {/* Left Column: Form (35%) */}
          <div className="lg:col-span-4 h-full">
            <FeedbackForm />
          </div>

          {/* Right Column: Feed (65%) */}
          <div className="lg:col-span-6 flex flex-col h-full overflow-hidden">
            <div className="mb-8">
              <h2 className="text-4xl font-bold tracking-tight text-primary">
                Cosmic Voices
              </h2>
              <p className="text-muted-foreground mt-2 text-lg font-medium">
                "See the impact of Karma shared by our community"
              </p>
            </div>

            <div className="flex-1 min-h-0">
              {isLoading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-32 parchment-card animate-pulse opacity-50 p-6" />
                  ))}
                </div>
              ) : error ? (
                <div className="p-8 parchment-card text-destructive text-center font-bold">
                  The cosmic connection failed. Please try again.
                </div>
              ) : sortedFeedbacks?.length === 0 ? (
                <div className="text-center py-20 parchment-card border-dashed">
                  <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6 text-primary/20">
                    <MessageSquareDashed className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">No Karma Shared Yet</h3>
                  <p className="text-muted-foreground mt-2 font-medium">Be the first to share your enlightenment!</p>
                </div>
              ) : (
                <div className="h-full overflow-y-auto custom-scrollbar pr-4 space-y-8 pb-10">
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

        </div>
      </main>
      
      {/* Spiritual background elements */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none opacity-[0.03] select-none">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[150px] translate-x-1/3 translate-y-1/3" />
        
        {/* Mandala SVG pattern placeholder/decoration */}
        <div className="absolute top-10 right-10 w-64 h-64 border-2 border-primary rounded-full flex items-center justify-center opacity-20 rotate-45">
          <div className="w-48 h-48 border border-primary rounded-full flex items-center justify-center">
            <div className="w-32 h-32 border border-primary rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
