import * as React from "react";

export class IterCounter extends React.Component<
  {
    iter: number;
  },
  {}
> {
  render() {
    return (
      <div className="iter-counter">
        <h1>Iteration {this.props.iter}</h1>
      </div>
    );
  }
}
