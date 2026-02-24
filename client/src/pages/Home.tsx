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
    <div className="min-h-screen bg-background relative overflow-x-hidden flex flex-col pb-6">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-4 w-full min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-8 h-auto lg:h-full">
          
          {/* Left Column: Form (40%) */}
          <div className="lg:col-span-4 min-h-0 lg:h-full">
            <div className="parchment-container p-4 sm:p-6 lg:p-10 min-h-0 lg:h-full border-2 border-[#d4c49c]/50 overflow-hidden">
              <FeedbackForm />
            </div>
          </div>

          {/* Right Column: Feed (60%) */}
          <div className="lg:col-span-6 min-h-0 lg:h-full flex flex-col">
            <div className="parchment-container p-4 sm:p-6 lg:p-10 min-h-0 lg:h-full border-2 border-[#d4c49c]/50 flex flex-col overflow-hidden">
              <div className="mb-6 lg:mb-10 shrink-0">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#5c3d2e] mb-2">
                  Cosmic Voices
                </h2>
                <p className="text-[#8b5e3c] text-base sm:text-lg font-medium">
                  Witness the impact, how we change lives
                </p>
              </div>

              <div className="flex-1 min-h-[200px] lg:min-h-0 overflow-y-auto custom-scrollbar pr-2 sm:pr-4 space-y-6">
                {isLoading ? (
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-32 parchment-card-refined animate-pulse opacity-50" />
                    ))}
                  </div>
                ) : error ? (
                  <div className="p-8 parchment-card-refined text-center font-bold text-red-800">
                    The cosmic connection failed. Please try again.
                  </div>
                ) : sortedFeedbacks?.length === 0 ? (
                  <div className="text-center py-20 parchment-card-refined border-dashed border-2">
                    <MessageSquareDashed className="w-12 h-12 text-[#c18c5d]/30 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-[#5c3d2e]">No Experience Shared Yet</h3>
                  </div>
                ) : (
                  sortedFeedbacks?.map((feedback, index) => (
                    <FeedbackCard 
                      key={feedback.id} 
                      feedback={feedback} 
                      index={index} 
                    />
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
      
      {/* Decorative background art matching reference image */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none opacity-20 select-none">
        {/* Temple/Hill silhouettes on sides */}
        <div className="absolute bottom-0 right-0 w-[50%] h-[60%] bg-gradient-to-t from-[#c18c5d]/40 to-transparent mask-image-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
        
        {/* Large Mandala in corner */}
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] border-[20px] border-[#c18c5d]/10 rounded-full opacity-30 flex items-center justify-center">
          <div className="w-[500px] h-[500px] border-[10px] border-[#c18c5d]/10 rounded-full" />
        </div>
      </div>
    </div>
  );
}
