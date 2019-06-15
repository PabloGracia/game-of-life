import * as React from "react";
import { IterCounter } from "./IterCounter";
import { NumberForm } from "./NumberForm";

interface IState {
  iter: number;
  dimension: number;
}

export class Main extends React.Component<{}, IState> {
  increase_iteration: any;
  constructor(props: any) {
    super(props);
    this.state = {
      iter: 0,
      dimension: 0
    };
  }

  componentDidMount() {
    this.increase_iteration = setInterval(() => {
      this.setState({ iter: this.state.iter + 1 });
    }, 1000);
  }

  render() {
    return (
      <div className="main-div">
        <NumberForm />
        <IterCounter iter={this.state.iter} />
      </div>
    );
  }
}
