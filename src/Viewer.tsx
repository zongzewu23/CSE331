import React, { Component } from 'react';
import { PipeElem, sew } from './pipe_elems';
import { pnil, WALL, DIRT } from './pipe';
import { pflip } from './pipe_ops';

type ViewerProps = {
  // TODO: fill in props needed from App to initialize component
  //       then replace hardcoded initial vales
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
      color: WALL,
      rows: 0n,
      flip: false,
      double: false
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
      <button onClick={() => console.log("TODO: create handler to replace this")}>Back</button>
    </div>
  }

  renderPipe = (): JSX.Element => {
    // TODO: replace "pnil" with a call to generatePipe() & pass in appropriate params
    const pipe = pnil;

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

  doSwapColorClick = (): void => {
    if (this.state.color === DIRT) {
      this.setState({color: WALL});
    } else {
      this.setState({color: DIRT});
    }
  }

  doAddRowsClick = (): void => {
    // TODO: update to add the minimum number of rows for the _current design_
    this.setState({rows: this.state.rows + 2n})
  }

  doFlipClick = (): void => {
    this.setState({flip: !this.state.flip});
  }

  doDoubleClick = (): void => {
    this.setState({double: !this.state.double});
  }
}