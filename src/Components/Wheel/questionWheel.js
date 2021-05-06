import React from 'react';


import Wheel from './wheel';

import './questionWheel.css';

export default class App extends React.Component {
  constructor() {
    super();
    this.types = ['React', 'Node', 'CSS', 'JavaScript', 'Html', 'Sql'];
  }

  render() {
    return (
      <div className="questionWheel">
        <h1 id='SpinTheWheel'>Spin the wheel!</h1>
        <Wheel items={this.types} />
      </div>
    );
  }
}
