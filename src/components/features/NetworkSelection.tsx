import { useState, type JSX } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface Network {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
}

export function NetworkSelection() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(networks[0]);

  const selectNetwork = (network: Network) => {
    setSelectedNetwork(network);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="w-full justify-between bg-card border-border hover:bg-accent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <div className="mr-2">{selectedNetwork.icon}</div>
          {selectedNetwork.name}
        </div>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {isOpen && (
        <Card className="absolute mt-2 w-full z-10 animate-in border-border bg-card shadow-lg">
          <CardContent className="p-1">
            {networks.map((network) => (
              <div
                key={network.id}
                className={`flex items-center justify-between px-3 py-2 cursor-pointer rounded-md hover:bg-accent ${
                  selectedNetwork.id === network.id ? "bg-accent" : ""
                }`}
                onClick={() => selectNetwork(network)}
              >
                <div className="flex items-center">
                  <div className="mr-2">{network.icon}</div>
                  {network.name}
                </div>
                {selectedNetwork.id === network.id && (
                  <Check className="h-4 w-4" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Network icons
const networks: Network[] = [
  {
    id: "ethereum",
    name: "Ethereum",
    icon: <div className="h-4 w-4 rounded-full bg-blue-500"></div>,
    color: "bg-blue-500",
  },
  {
    id: "starknet",
    name: "Starknet",
    icon: <div className="h-4 w-4 rounded-full bg-purple-500"></div>,
    color: "bg-purple-500",
  },
  {
    id: "arbitrum",
    name: "Arbitrum",
    icon: <div className="h-4 w-4 rounded-full bg-green-500"></div>,
    color: "bg-green-500",
  },
  {
    id: "optimism",
    name: "Optimism",
    icon: <div className="h-4 w-4 rounded-full bg-red-500"></div>,
    color: "bg-red-500",
  },
];
