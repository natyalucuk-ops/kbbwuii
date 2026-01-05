import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface QuoteData {
  id: string;
  content: string;
  author: string | null;
}

export const QuoteSection = () => {
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomQuote = async () => {
      const { data: quotes, error } = await supabase
        .from("quotes")
        .select("*")
        .eq("is_active", true);

      if (!error && quotes && quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
      }
      setLoading(false);
    };

    fetchRandomQuote();
  }, []);

  if (loading || !quote) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 via-pink/5 to-secondary/5 relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-4 left-10 text-primary/20"
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-4 right-10 text-secondary/20"
      >
        <Sparkles className="w-12 h-12" />
      </motion.div>
      
      <div className="container-main px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={quote.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent via-pink to-secondary rounded-full mb-6 shadow-lg shadow-accent/30"
            >
              <Quote className="w-8 h-8 text-white" />
            </motion.div>
            
            <motion.blockquote
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-foreground leading-relaxed mb-4"
            >
              "{quote.content}"
            </motion.blockquote>
            
            {quote.author && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground font-medium"
              >
                — {quote.author}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default QuoteSection;
