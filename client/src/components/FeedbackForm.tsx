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
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 md:p-8 border border-slate-100 sticky top-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Send us a message
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          We'd love to hear from you! Share your thoughts or suggestions.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 font-medium">Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="John Doe" 
                    className="rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all bg-slate-50/50 hover:bg-white" 
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
                <FormLabel className="text-slate-700 font-medium">Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="john@example.com" 
                    className="rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all bg-slate-50/50 hover:bg-white" 
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
                <FormLabel className="text-slate-700 font-medium">Message</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us what you think..." 
                    className="min-h-[120px] resize-none rounded-lg border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all bg-slate-50/50 hover:bg-white" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-6 rounded-xl shadow-lg shadow-indigo-200 transition-all duration-300"
              disabled={createFeedback.isPending}
            >
              {createFeedback.isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Submit Feedback
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
    </div>
  );
}
