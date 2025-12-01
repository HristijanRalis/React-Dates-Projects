import { useEffect, useState } from "react";
import "./QuoteOfTheDay.css";

type Quote = {
  id: number;
  quote: string;
  author: string;
};

export const QuoteOfTheDay = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const today = new Date().toISOString().split("T")[0];

  const fetchRandomQuote = async () => {
    try {
      const res = await fetch("https://dummyjson.com/quotes?limit=30");
      const data = await res.json(); 

      if(!data.quotes || data.quotes === 0) return;

      const randomIndex = Math.floor(Math.random() * data.quotes.length);
      const selectedQuote = data.quotes[randomIndex];

      localStorage.setItem(today, JSON.stringify(selectedQuote));
      setQuote(selectedQuote);
    } catch (error) {
      console.log("Error fetching quote:", error);
    }
  };
  useEffect(() => {
    const savedQuote = localStorage.getItem(today);

    if (savedQuote) {
      setQuote(JSON.parse(savedQuote));
      return;
    } else {
      fetchRandomQuote();
    }
  }, []);

  return (
    <div className="QuoteOfTheDay">
      <h2>Quote of the day!</h2>

      {quote ? (
        <blockquote>
          “{quote.quote}”<footer>— {quote.author}</footer>
        </blockquote>
      ) : (
        <p>Loading...</p>
      )}

      <button className="btn generateBtn" onClick={fetchRandomQuote}>Quote</button>
    </div>
  );
};
