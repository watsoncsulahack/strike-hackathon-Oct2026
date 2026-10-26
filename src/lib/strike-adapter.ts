import { MarketQuote, DataMode } from "@/types";

export const SAMPLE_MARKETS: Record<string, MarketQuote> = {
  "ADA-USD": {
    symbol: "ADA-USD",
    name: "Cardano / USD",
    baseAsset: "ADA",
    markPrice: 0.2185,
    indexPrice: 0.2182,
    fundingRate: 0.0001,
    bestBid: 0.2184,
    bestAsk: 0.2186,
    timestamp: Date.now(),
    isStale: false,
    minSize: 10,
    priceDecimals: 4,
    source: "SAMPLE_SCENARIO",
  },
  "BTC-USD": {
    symbol: "BTC-USD",
    name: "Bitcoin / USD",
    baseAsset: "BTC",
    markPrice: 82450.0,
    indexPrice: 82460.0,
    fundingRate: 0.0001,
    bestBid: 82445.0,
    bestAsk: 82455.0,
    timestamp: Date.now(),
    isStale: false,
    minSize: 0.001,
    priceDecimals: 2,
    source: "SAMPLE_SCENARIO",
  },
  "ETH-USD": {
    symbol: "ETH-USD",
    name: "Ethereum / USD",
    baseAsset: "ETH",
    markPrice: 2435.5,
    indexPrice: 2436.0,
    fundingRate: 0.0001,
    bestBid: 2435.0,
    bestAsk: 2436.0,
    timestamp: Date.now(),
    isStale: false,
    minSize: 0.01,
    priceDecimals: 2,
    source: "SAMPLE_SCENARIO",
  },
};

export async function fetchLiveStrikeQuote(
  symbol: string = "ADA-USD"
): Promise<{ quote: MarketQuote; error?: string }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(
      `https://api.strikefinance.org/price/v2/premiumIndex?symbol=${encodeURIComponent(symbol)}`,
      {
        signal: controller.signal,
        headers: { Accept: "application/json" },
        cache: "no-store",
      }
    );
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Strike API returned HTTP ${res.status}`);
    }

    const data = await res.json();
    const markPrice = parseFloat(data.markPrice || "0");
    const indexPrice = parseFloat(data.indexPrice || "0");
    const fundingRate = parseFloat(data.lastFundingRate || "0");
    const serverTime = parseInt(data.time || Date.now().toString(), 10);

    if (markPrice <= 0) {
      throw new Error("Invalid mark price received from Strike");
    }

    // Determine min size and base asset
    const baseAsset = symbol.split("-")[0];
    const minSize = baseAsset === "BTC" ? 0.001 : baseAsset === "ETH" ? 0.01 : 10;
    const decimals = markPrice < 1 ? 4 : markPrice < 100 ? 3 : 2;

    const quote: MarketQuote = {
      symbol,
      name: `${baseAsset} / USD Perpetual`,
      baseAsset,
      markPrice,
      indexPrice,
      fundingRate,
      bestBid: markPrice * 0.9998,
      bestAsk: markPrice * 1.0002,
      timestamp: serverTime,
      isStale: false,
      minSize,
      priceDecimals: decimals,
      source: "LIVE_STRIKE",
    };

    return { quote };
  } catch (err: any) {
    // Fall back to sample quote with simulated slight drift
    const fallback = SAMPLE_MARKETS[symbol] || SAMPLE_MARKETS["ADA-USD"];
    const jitter = (Math.random() - 0.5) * 0.001 * fallback.markPrice;
    const newPrice = Math.round((fallback.markPrice + jitter) * 10000) / 10000;

    return {
      quote: {
        ...fallback,
        markPrice: newPrice,
        bestBid: newPrice * 0.9998,
        bestAsk: newPrice * 1.0002,
        timestamp: Date.now(),
        source: "SAMPLE_SCENARIO",
      },
      error: err?.message || "Using sample scenario mode (Strike live API unavailable)",
    };
  }
}
