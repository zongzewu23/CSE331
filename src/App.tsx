import React, { Component, ChangeEvent } from 'react';
import { Viewer } from './Viewer';

type AppProps = {};  // no props

type AppState = {
  renderPipe: boolean,
  design: string,
  color: string,
  rows: bigint,
  flip: boolean,
  double: boolean,
  error: string
};


/** Top-level component that displays the entire UI. */
export class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      renderPipe: false,
      design: "",
      color: "",
      rows: 2n,
      flip: false,
      double: false,
      error: ""
    }
  }

  render = (): JSX.Element => {
    if (this.state.renderPipe === true) {
      // TODO: add needed props to Viewer
      return <Viewer design={this.state.design} 
                     initialColor={this.state.color}  
                     initialRows={this.state.rows}
                     initFlip={this.state.flip}
                     initDouble={this.state.double}
                     onBack={this.doBackClick}></Viewer>
    } else {
      return this.renderPipeForm();
    }
  }

  renderPipeForm = (): JSX.Element => {
    return (<div>
      <p>
      <label>Select a design:</label>
      <select name="design" value={this.state.design} onChange={this.doDesignChange}>
        <option value="">Select</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select>
      </p>

      <p>
      <label>Select a color:</label>
      <select name="color" value={this.state.color} onChange={this.doColorChange}>
        <option value="">Select</option>
        <option value="DIRT">dirt</option>
        <option value="WALL">wall</option>
      </select>
      </p>

      <p>
      <label>Select a number of rows:</label>
        <input type="number" name="rows" min="2"
          value={Number(this.state.rows)} // input doesn't support bigint, convert to Number
          onChange={this.doRowsChange}></input>
      </p>

      <p>
      <label>Flip Pipe</label>
      <input type="checkbox" name="flip" checked={this.state.flip} onChange={this.doFlipChange}></input>
      </p>

      <p>
      <label>Double Pipe</label>
      <input type="checkbox" name="double" checked={this.state.double} onChange={this.doDoubleChange}></input>
      </p>

      <button onClick={this.doGoClick}>Go</button>

      <p style={{color: "wall"}}>{this.state.error}</p>
    </div>);
  }

  // TODO: update methods or add new ones as needed
  doBackClick = (design: string, rows: bigint, color: string, flip: boolean, double: boolean): void => {
    this.setState({
      renderPipe: false,
      design: design,
      color: color,
      rows: rows,
      flip: flip,
      double: double
    });
  }

  doDesignChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
    this.setState({design: evt.target.value, error: ""});
  }

  doColorChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
    this.setState({color: evt.target.value, error: ""});
  }

  doRowsChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({rows: BigInt(evt.target.value), error: ""});
  }

  doFlipChange = (_evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({flip: !this.state.flip, error: ""});
  }

  doDoubleChange = (_evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({double: !this.state.double, error: ""});
  }

  doGoClick = (): void => {
    if (this.state.design === "") {
      this.setState({error: "Must select a design"});

    } else if (this.state.color === "") {
      this.setState({error: "Must select a color"});

    } else if (this.state.rows <= 0n) {
      this.setState({error: "Must select a non-zero number of rows."});

    } else if ((this.state.design === "A" || this.state.design === "B")
        && this.state.rows % 2n !== 0n) {
      this.setState({error: "Designs A and B can only be made with an even numbers of rows"});

    } else if (this.state.design === "C" && this.state.rows % 3n !== 0n) {
      this.setState({error: "Design C can only be made with a number of rows that is a multiple of 3"});

    } else {
      this.setState({renderPipe: true});
    }
  }
}