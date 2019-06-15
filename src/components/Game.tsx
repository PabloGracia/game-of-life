import * as React from "react";

interface IProps {
  iteration: number;
  world: boolean[][];
}
interface IState {
  iteration: number;
  given_iteration: number;
  given_world: boolean[][];
  calculated_world: boolean[][];
  displayed_world: boolean[][];
}
export class Game extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      iteration: 0,
      given_iteration: this.props.iteration,
      given_world: this.props.world,
      calculated_world: [[]],
      displayed_world: [[]]
    };
  }

  setWorld(world_matrix: boolean[][]) {
    if (this.state.iteration === 0) {
      this.setState({
        displayed_world: this.state.given_world
      });
    } else {
      this.setState({
        displayed_world: world_matrix
      });
    }
  }

  render() {
    return <div className="game">GRID</div>;
  }
}
