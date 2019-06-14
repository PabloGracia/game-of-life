import * as React from "react";
import { IterCounter } from "./IterCounter";

export class Main extends React.Component<
  {},
  {
    iter: number;
  }
> {
  increase_iteration: any;
  constructor(props: any) {
    super(props);
    this.state = {
      iter: 1
    };
  }

  componentDidMount() {
    this.increase_iteration = setInterval(() => {
      this.setState({ iter: this.state.iter + 1 });
    }, 1000);
  }
  render() {
    return <IterCounter iter={this.state.iter} />;
  }
}
