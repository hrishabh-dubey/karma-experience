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
    <div className="parchment-card p-8 saffron-glow h-full flex flex-col">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-primary mb-2">
          Share Your Karma Experience
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          "Let your karma speak. Your words are energy — and energy never fades."
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1 flex flex-col">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-semibold">Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your Divine Name" 
                    className="rounded-lg border-border focus:border-primary focus:ring-primary/20 transition-all bg-white/50" 
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
                <FormLabel className="text-foreground font-semibold">Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="spiritual@journey.com" 
                    className="rounded-lg border-border focus:border-primary focus:ring-primary/20 transition-all bg-white/50" 
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
              <FormItem className="flex-1 flex flex-col">
                <FormLabel className="text-foreground font-semibold">Message</FormLabel>
                <FormControl className="flex-1">
                  <Textarea 
                    placeholder="Share your enlightenment..." 
                    className="flex-1 min-h-[250px] resize-none rounded-lg border-border focus:border-primary focus:ring-primary/20 transition-all bg-white/50" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
            <Button 
              type="submit" 
              className="w-full saffron-gradient hover:opacity-90 text-white font-bold py-7 rounded-xl shadow-lg saffron-glow transition-all duration-300 text-lg"
              disabled={createFeedback.isPending}
            >
              {createFeedback.isPending ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  Sending Energy...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-6 w-6" />
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
