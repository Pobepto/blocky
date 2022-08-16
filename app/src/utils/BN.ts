import { BigNumber as EthersBigNumber } from "@ethersproject/bignumber";
import BigNumber from "bignumber.js";

BigNumber.config({ EXPONENTIAL_AT: [-100, 100] });

type Undefinable<T> = T | undefined;
type TValue = BN | EthersBigNumber | BigNumber.Value;

const bignumberify = (n: any): string | number => {
  if (n && n.toString) {
    const primitive = n.toString();

    if (typeof primitive !== "object") {
      return primitive;
    }
  }

  return n;
};

export class BN extends BigNumber {
  constructor(n: TValue, base?: number) {
    super(bignumberify(n), base);
  }

  abs(): BN {
    return new BN(super.abs());
  }

  div(n: TValue, base?: Undefinable<number>): BN {
    return new BN(super.div(bignumberify(n), base));
  }

  dividedBy = this.div;

  pow(n: TValue, m?: Undefinable<TValue>): BN {
    return new BN(super.pow(bignumberify(n), bignumberify(m)));
  }

  exponentiatedBy = this.pow;

  minus(n: TValue, base?: Undefinable<number>): BN {
    return new BN(super.minus(bignumberify(n), base));
  }

  mod(n: TValue, base?: Undefinable<number>): BN {
    return new BN(super.mod(bignumberify(n), base));
  }

  modulo = this.mod;

  times(n: TValue, base?: Undefinable<number>): BN {
    return new BN(super.times(bignumberify(n), base));
  }

  multipliedBy = this.times;

  negated(): BN {
    return new BN(super.negated());
  }

  plus(n: TValue, base?: Undefinable<number>): BN {
    return new BN(super.plus(bignumberify(n), base));
  }

  sqrt(): BN {
    return new BN(super.sqrt());
  }

  squareRoot = this.sqrt;

  toDecimalPlaces(
    decimalPlaces: number,
    roundingMode: BigNumber.RoundingMode = BigNumber.ROUND_DOWN
  ): BN {
    return new BN(super.dp(decimalPlaces, roundingMode));
  }

  /**
   * @example
   * new BN('1234.5678').toSignificant(2) === 1,234.56
   * new BN('1234.506').toSignificant(2) === 1,234.5
   * new BN('123.0000').toSignificant(2) === 123
   * new BN('0.001234').toSignificant(2) === 0.0012
   */
  toSignificant(
    significantDigits: number,
    roundingMode: BigNumber.RoundingMode = BigNumber.ROUND_DOWN
  ): string {
    return this.gte(1) || significantDigits === 0
      ? this.toFormat(significantDigits, roundingMode).replace(/(\.0+|0+)$/, "")
      : super.precision(significantDigits, roundingMode).toString();
  }

  toEtherBigNumber(): EthersBigNumber {
    return EthersBigNumber.from(this.toFixed(0));
  }

  clamp(min: TValue, max: TValue): BN {
    return BN.min(BN.max(this, min), max);
  }

  static clamp(number: TValue, min: TValue, max: TValue): BN {
    return BN.min(BN.max(number, min), max);
  }

  static max(...n: TValue[]): BN {
    return new BN(super.max(...n.map(bignumberify)));
  }

  static min(...n: TValue[]): BN {
    return new BN(super.min(...n.map(bignumberify)));
  }

  static toBN(p: Promise<EthersBigNumber | number | string>): Promise<BN> {
    return p.then((v) => new BN(v));
  }

  static parseUnits(value: TValue, decimals = 18): BN {
    return new BN(10).pow(decimals).times(bignumberify(value));
  }

  static formatUnits(value: TValue, decimals = 18): BN {
    return new BN(value).div(new BN(10).pow(decimals));
  }

  static percentOf(value: TValue, percent: TValue): BN {
    return new BN(new BN(value).times(percent).div(100).toFixed(0));
  }

  static ratioOf(valueA: TValue, valueB: TValue): BN {
    return new BN(valueA).div(valueB).times(100);
  }

  static ZERO = new BN(0);
}
