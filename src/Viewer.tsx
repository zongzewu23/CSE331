import React, { Component } from 'react';
import { generatePipe, PipeElem, sew } from './pipe_elems';
import { WALL, DIRT } from './pipe';
import { pflip } from './pipe_ops';

type ViewerProps = {
  // TODO: fill in props needed from App to initialize component
  //       then replace hardcoded initial vales
  design: string;
  initialRows: bigint;
  initialColor: string;
  initFlip: boolean;
  initDouble: boolean;
  onBack: (design: string, rows: bigint, color: string, flip:boolean, double:boolean) => void;
}

type ViewerState = {
  color: string,
  rows: bigint,
  flip: boolean,
  double: boolean,
}

export class Viewer extends Component<ViewerProps, ViewerState> {
  constructor(props: ViewerProps) {
    super(props);

    this.state = {
      color: this.props.initialColor,
      rows: this.props.initialRows,
      flip: this.props.initFlip,
      double: this.props.initDouble
    }
  }

  render = (): JSX.Element => {
    return <div>
      {this.renderPipe()}
      <div>
        <button onClick={this.doSwapColorClick}>Swap Color</button>
        <button onClick={this.doAddRowsClick}>Add Rows</button>
        <button onClick={this.doFlipClick}>Flip</button>
        {this.renderDoubleBtn()}
      </div>
      <button onClick={this.doBackClick}>Back</button>
    </div>
  }

  renderPipe = (): JSX.Element => {
    // TODO: replace "pnil" with a call to generatePipe() & pass in appropriate params
    const pipe = generatePipe(this.props.design, this.state.color, this.state.rows);

    if (this.state.flip === true && this.state.double === true) {
      return <PipeElem pipe={pflip(sew(pipe, pipe))}></PipeElem>;
    } else if (this.state.flip === true) {
      return <PipeElem pipe={pflip(pipe)}></PipeElem>;
    } else if (this.state.double === true) {
      return <PipeElem pipe={sew(pipe, pipe)}></PipeElem>;
    } else {
      return <PipeElem pipe={pipe}></PipeElem>;
    }
  }

  renderDoubleBtn = (): JSX.Element => {
    if (this.state.double === false) {
      return <button onClick={this.doDoubleClick}>Double</button>;
    } else {
      return <button onClick={this.doDoubleClick}>Un-double</button>;

    }
  }

  // TODO: update methods or add new ones as needed
  doBackClick = (): void => {
    this.props.onBack(this.props.design, this.state.rows, this.state.color, this.state.flip, this.state.double);
  }

  doSwapColorClick = (): void => {
    if (this.state.color === DIRT) {
      this.setState({color: WALL});
    } else {
      this.setState({color: DIRT});
    }
  }

  doAddRowsClick = (): void => {
    // TODO: update to add the minimum number of rows for the _current design_
    if (this.props.design === "A" || this.props.design === "B") {
      this.setState({rows: this.state.rows + 2n})
    } else if (this.props.design === "C"){
      this.setState({rows: this.state.rows + 3n})
    } else {
      throw new Error("Not a valid design");
    }
  }

  doFlipClick = (): void => {
    this.setState({flip: !this.state.flip});
  }

  doDoubleClick = (): void => {
    this.setState({double: !this.state.double});
  }
}