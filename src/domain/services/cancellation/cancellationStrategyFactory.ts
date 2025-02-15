import { ICancellationStrategy } from "./ICancellationStrategy";
import { FullRefundStrategy } from "./strategies/fullRefundStrategy";
import { PartialRefundStrategy } from "./strategies/partialRefundStrategy";
import { NoRefundStrategy } from "./strategies/noRefundStrategy";

export class CancellationStrategyFactory {
  private static strategies: ICancellationStrategy[] = [
    new FullRefundStrategy(),
    new PartialRefundStrategy(),
    new NoRefundStrategy(),
  ];

  static getStrategy(diffDays: number): ICancellationStrategy {

    return this.strategies.find(strategy => strategy.canApply(diffDays))!;
  }
}
