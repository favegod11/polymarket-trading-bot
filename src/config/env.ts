import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  PRIVATE_KEY: z.string().min(1, "PRIVATE_KEY is required"),
  DRY_RUN: z.enum(["true", "false"]).default("true"),
  LOG_LEVEL: z.string().default("info"),
  MAX_POSITION_USD: z.string().default("50"),
  MAX_DAILY_LOSS_USD: z.string().default("25"),
  TAKE_PROFIT_PCT: z.string().default("12"),
  STOP_LOSS_PCT: z.string().default("6"),
  POLYMARKET_MARKET_SLUGS: z.string().default("btc-up-or-down-15m,eth-up-or-down-15m"),
  ORDER_SIZE_USD: z.string().default("25"),
  COOLDOWN_SECONDS: z.string().default("10"),
});

export const env = envSchema.parse(process.env);

export function buildRuntimeContext() {
  const privateKeyPreview =
    env.PRIVATE_KEY.length <= 10
      ? env.PRIVATE_KEY
      : `${env.PRIVATE_KEY.slice(0, 6)}...${env.PRIVATE_KEY.slice(-4)}`;

  return {
    repo: "polymarket-trading-bot",
    family: "polymarket",
    market: "Polymarket CLOB markets",
    signal: "short-window momentum and odds acceleration",
    dryRun: env.DRY_RUN === "true",
    orderSize: env.ORDER_SIZE_USD,
    privateKeyPreview,
  } as const;
}
