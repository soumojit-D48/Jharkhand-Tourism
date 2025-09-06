import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import axios from "axios";

const AiChat = () => {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      content: "Welcome to Jharkhand Tourism AI Assistant! I can help you discover amazing eco-tourism spots, cultural heritage sites, and plan your perfect trip to Jharkhand. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef(null);
  const messagesEndRef = useRef(null);

  const suggestions = [
    "Best eco-tourism spots in Jharkhand",
    "Cultural festivals and traditions",
    "Wildlife sanctuaries to visit",
    "Best time to visit Jharkhand",
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const result = await axios.post(`${import.meta.env.VITE_API_URL}/api/ai/chat`, {
        prompt: inputValue
      })
      

      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: result.data.message,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse])
    } 
    catch (error) {
      console.error("Error fetching AI response:", error);

    const errorMsg = {
      id: (Date.now() + 1).toString(),
      content: "⚠️ Sorry, something went wrong. Please try again.",
      isUser: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, errorMsg]);
    }
    finally{
      setIsLoading(false)
    }

  };


  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

return (

    <Card className="h-[600px] flex flex-col shadow-xl border border-gray-200 bg-white/90 backdrop-blur-sm">
          {/* Messages Area with proper scrolling */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 break-words ${
                        message.isUser
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white ml-4 shadow-lg"
                          : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 mr-4 border border-gray-300"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      <span className="text-xs opacity-70 mt-2 block">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 rounded-2xl px-4 py-3 mr-4 border border-gray-300">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                        <span className="text-xs opacity-70">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Invisible div for auto-scrolling */}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/30 flex-shrink-0">
              <p className="text-sm text-gray-600 mb-3">Popular questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-colors border-gray-300"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-6 border-t border-gray-200 bg-gray-50/50 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Jharkhand's tourism, culture, or nature..."
                  className="pr-12 py-6 text-base rounded-full border-2 border-gray-300 focus:border-green-400 transition-colors bg-white"
                  disabled={isLoading}
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="rounded-full w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>
    )
}

export default AiChat
