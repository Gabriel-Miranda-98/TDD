import { CancellationStrategyFactory } from "../cancellationStrategyFactory";
import { FullRefundStrategy } from "../strategies/fullRefundStrategy";
import { PartialRefundStrategy } from "../strategies/partialRefundStrategy";
import { NoRefundStrategy } from "../strategies/noRefundStrategy";

describe('CancellationStrategyFactory', () => {
  it('should return FullRefundStrategy when days difference is more than 6', () => {
    const strategy = CancellationStrategyFactory.getStrategy(7);
    expect(strategy).toBeInstanceOf(FullRefundStrategy);
  });

  it('should return PartialRefundStrategy when days difference is between 2 and 6', () => {
    const strategy = CancellationStrategyFactory.getStrategy(4);
    expect(strategy).toBeInstanceOf(PartialRefundStrategy);
  });

  it('should return NoRefundStrategy when days difference is less than 2', () => {
    const strategy = CancellationStrategyFactory.getStrategy(1);
    expect(strategy).toBeInstanceOf(NoRefundStrategy);
  });
});
