import React,{Component} from 'react';
import './InfoLayer.scss';

class InfoLayer extends Component {
  render() {
    let moment = require('moment');

    return (
      <div className='info-layer'>
        <div className='today-info'>
          <div className='item'>
            TODAY
          </div>
          <div className='item'>
            {`...${moment().format("YYYY. MM. DD")}`}
          </div>
        </div>
      </div>
    );
  }
}

export default InfoLayer;