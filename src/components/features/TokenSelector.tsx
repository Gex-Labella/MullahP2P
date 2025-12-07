import { useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

interface Token {
  symbol: string;
  name: string;
  logo: string;
  balance: string;
}

export function TokenSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<Token>(tokens[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const selectToken = (token: Token) => {
    setSelectedToken(token);
    setIsOpen(false);
  };

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="w-full justify-between bg-card border-border hover:bg-accent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <img
            src={selectedToken.logo}
            alt={selectedToken.symbol}
            className="w-5 h-5 mr-2 rounded-full"
          />
          {selectedToken.symbol}
        </div>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {isOpen && (
        <Card className="absolute mt-2 w-full z-10 animate-in border-border bg-card shadow-lg">
          <CardContent className="p-2">
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search tokens..."
                className="pl-10 bg-background border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="max-h-60 overflow-auto">
              {filteredTokens.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No tokens found
                </div>
              ) : (
                filteredTokens.map((token) => (
                  <div
                    key={token.symbol}
                    className={`flex items-center justify-between px-3 py-2 cursor-pointer rounded-md hover:bg-accent ${
                      selectedToken.symbol === token.symbol ? "bg-accent" : ""
                    }`}
                    onClick={() => selectToken(token)}
                  >
                    <div className="flex items-center">
                      <img
                        src={token.logo}
                        alt={token.symbol}
                        className="w-6 h-6 mr-2 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{token.symbol}</p>
                        <p className="text-xs text-muted-foreground">
                          {token.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm mr-2">{token.balance}</span>
                      {selectedToken.symbol === token.symbol && (
                        <Check className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Mock token data with placeholder logos
const tokens: Token[] = [
  {
    symbol: "ETH",
    name: "Ethereum",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    balance: "1.234",
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    logo: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    balance: "100.00",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    balance: "50.00",
  },
  {
    symbol: "DAI",
    name: "Dai Stablecoin",
    logo: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png",
    balance: "75.50",
  },
  {
    symbol: "WBTC",
    name: "Wrapped Bitcoin",
    logo: "https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.png",
    balance: "0.05",
  },
];
