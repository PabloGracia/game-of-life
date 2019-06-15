import * as React from "react";

export class NumberForm extends React.Component<
  {},
  {
    value: number | undefined;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: undefined
    };
  }

  handleChange(event: any) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event: any) {
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Dimensions of the initial world (must be bigger than 3)
          <input
            type="number"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
