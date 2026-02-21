import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type FeedbackInput } from "@shared/routes";

export function useFeedback() {
  return useQuery({
    queryKey: [api.feedback.list.path],
    queryFn: async () => {
      const res = await fetch(api.feedback.list.path);
      if (!res.ok) throw new Error("Failed to fetch feedback");
      return api.feedback.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateFeedback() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FeedbackInput) => {
      // Validate locally before sending (though zod resolver in form handles this too)
      const validated = api.feedback.create.input.parse(data);
      
      const res = await fetch(api.feedback.create.path, {
        method: api.feedback.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.feedback.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to submit feedback");
      }
      return api.feedback.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      // Invalidate query to refresh the list instantly
      queryClient.invalidateQueries({ queryKey: [api.feedback.list.path] });
    },
  });
}
