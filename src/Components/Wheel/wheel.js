import React from 'react';
import {Link} from 'react-router-dom';
import './wheel.css';

export default class Wheel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      WheelDisplay: true,
      items: [props],
      selectedItem: null,
      continueButton: "closed",
    };
    this.selectItem = this.selectItem.bind(this);
    this.changebutton = this.changebutton.bind(this);
  }



  changebutton(){
    this.setState({ continueButton: "open"})
  }

  selectItem() {
    if (this.state.selectedItem === null) {
      const selectedItem = Math.floor(Math.random() * this.props.items.length);
      if (this.props.onSelectItem) {
        this.props.onSelectItem(selectedItem);
      }
      this.setState({ selectedItem });
    } else {
      this.setState({ selectedItem: null });
      setTimeout(this.selectItem, 500);
    }
  }


  render() {
    const { selectedItem } = this.state;
    const { items } = this.props;

    const wheelVars = {
      '--nb-item': items.length,
      '--selected-item': selectedItem,
    };
    const spinning = selectedItem !== null ? 'spinning' : '';

    return (
      <div className="wheel-container">
        <div className={`wheel ${spinning}`} style={wheelVars} >
          {items.map((item, index) => (
            <div className="wheel-item" key={index} style={{ '--item-nb': index }}>
              {item}
            </div>
          ))}
        </div>
        

        <button class= 'push-me' onClick={this.selectItem}
        >Push Me</button>
        <br/>
        <Link to={`/question/${items[selectedItem]}`}><button class='Continue'>Continue</button></Link>

      </div>
    );
  }
}
//{{Visibility: Visible}} 
//style={{Visibility: 'Visible'}}