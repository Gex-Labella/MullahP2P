import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface Block {
  id: number;
  hash: string;
  timestamp: number;
  transactions: number;
}

export function BlockchainVisualizer() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const blockIdCounter = useRef(0);

  useEffect(() => {
    // Initialize with some blocks
    const initialBlocks: Block[] = [];
    for (let i = 0; i < 5; i++) {
      initialBlocks.push({
        id: blockIdCounter.current++,
        hash: Math.random().toString(16).substring(2, 10),
        timestamp: Date.now() - i * 15000,
        transactions: Math.floor(Math.random() * 20) + 1,
      });
    }
    setBlocks(initialBlocks);

    // Add new blocks periodically
    const interval = setInterval(() => {
      setBlocks((prev) => {
        const newBlock: Block = {
          id: blockIdCounter.current++,
          hash: Math.random().toString(16).substring(2, 10),
          timestamp: Date.now(),
          transactions: Math.floor(Math.random() * 20) + 1,
        };
        return [newBlock, ...prev.slice(0, 4)];
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-8 right-8 z-20 hidden lg:block">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/10"
      >
        <h3 className="text-sm font-medium mb-3 text-white/80">
          Live Blockchain
        </h3>
        <div className="space-y-2">
          {blocks.map((block, index) => (
            <motion.div
              key={`block-${block.id}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 text-xs"
            >
              <motion.div
                animate={{
                  boxShadow:
                    index === 0
                      ? [
                          "0 0 0px rgba(16, 185, 129, 0.5)",
                          "0 0 10px rgba(16, 185, 129, 0.8)",
                          "0 0 0px rgba(16, 185, 129, 0.5)",
                        ]
                      : "none",
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-3 h-3 rounded-sm ${
                  index === 0 ? "bg-emerald-400" : "bg-blue-400"
                }`}
              />
              <div className="text-white/70">
                <div>#{block.hash}</div>
                <div className="text-white/50">{block.transactions} txns</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
