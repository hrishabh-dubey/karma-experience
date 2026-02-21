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
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-5 xl:col-span-4 order-1 lg:order-2">
            <FeedbackForm />
          </div>

          {/* Right Column: Feed (on mobile comes after form) */}
          <div className="lg:col-span-7 xl:col-span-8 order-2 lg:order-1">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                Recent Feedback
              </h2>
              <p className="text-slate-500 mt-2 text-lg">
                See what others are saying about our product.
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-48 bg-white rounded-xl animate-pulse shadow-sm border border-slate-100 p-6">
                    <div className="h-10 w-10 bg-slate-100 rounded-full mb-4"></div>
                    <div className="h-4 bg-slate-100 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="p-8 rounded-xl bg-red-50 border border-red-100 text-red-600 text-center">
                Failed to load feedback. Please try again later.
              </div>
            ) : sortedFeedbacks?.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-200">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <MessageSquareDashed className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">No feedback yet</h3>
                <p className="text-slate-500 mt-1">Be the first to share your thoughts!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
      </div>
    </div>
  );
}
