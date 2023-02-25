class Variable {
  value?: number;
  type: any;
  positive: boolean;

  constructor(type: any, positive: boolean, value?: number) {
    this.type = type;
    this.positive = positive;
    if (value) {
      this.value = value;
    }
  }
}

export default Variable;