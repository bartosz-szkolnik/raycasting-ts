export class Vec2 {
  constructor(public x: number, public y: number) {}

  array(): [number, number] {
    return [this.x, this.y];
  }

  div(that: Vec2): Vec2 {
    return new Vec2(this.x / that.x, this.y / that.y);
  }

  mul(that: Vec2): Vec2 {
    return new Vec2(this.x * that.x, this.y * that.y);
  }

  sub(that: Vec2): Vec2 {
    return new Vec2(this.x - that.x, this.y - that.y);
  }

  add(that: Vec2): Vec2 {
    return new Vec2(this.x + that.x, this.y + that.y);
  }

  norm() {
    const l = this.length();
    if (l === 0) {
      return Vec2.zero();
    }

    return new Vec2(this.x / l, this.y / l);
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  scale(value: number): Vec2 {
    return new Vec2(this.x * value, this.y * value);
  }

  rot90(): Vec2 {
    return new Vec2(-this.y, this.x);
  }

  distanceTo(that: Vec2) {
    return that.sub(this).length();
  }

  lerp(that: Vec2, t: number): Vec2 {
    return that.sub(this).scale(t).add(this);
  }

  dot(that: Vec2): number {
    return this.x * that.x + this.y * that.y;
  }

  static fromAngle(angle: number): Vec2 {
    return new Vec2(Math.cos(angle), Math.sin(angle));
  }

  static zero() {
    return new Vec2(0, 0);
  }
}
