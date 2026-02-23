import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertFeedbackSchema } from "@shared/schema";
import { type FeedbackInput } from "@shared/routes";
import { useCreateFeedback } from "@/hooks/use-feedback";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function FeedbackForm() {
  const { toast } = useToast();
  const createFeedback = useCreateFeedback();

  const form = useForm<FeedbackInput>({
    resolver: zodResolver(insertFeedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: FeedbackInput) => {
    createFeedback.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Feedback Submitted!",
          description: "Thank you for sharing your thoughts with us.",
          variant: "default",
          className: "bg-green-50 border-green-200 text-green-900",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Submission Failed",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-[#5c3d2e] mb-2">
          Share Your Experience
        </h2>
        <p className="text-[#8b5e3c] text-sm font-medium">
          Speak your mind and let your energy flow.<br />
          We're listening to your cosmic vibes ✨
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#5c3d2e] font-bold text-lg">Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your Name" 
                    className="h-12 rounded-lg border-[#d4c49c] bg-[#fdfaf1]/50 focus:bg-white transition-colors" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel className="text-[#5c3d2e] font-bold text-lg">Email</FormLabel>
                  <span className="text-[10px] text-[#8b5e3c] font-bold uppercase opacity-60">Optional</span>
                </div>
                <FormControl>
                  <Input 
                    placeholder="your@email.com (optional)" 
                    className="h-12 rounded-lg border-[#d4c49c] bg-[#fdfaf1]/50 focus:bg-white transition-colors" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea 
                    placeholder="Share your karma experience..." 
                    className="min-h-[150px] rounded-lg border-[#d4c49c] bg-[#fdfaf1]/50 focus:bg-white transition-colors resize-none" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              type="submit" 
              className="w-full divine-button h-14 text-xl tracking-wide rounded-xl"
              disabled={createFeedback.isPending}
            >
              {createFeedback.isPending ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  Chanting...
                </>
              ) : (
                <>
                  <Send className="mr-3 h-6 w-6" />
                  Submit Your Feedback
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
    </div>
  );
}
