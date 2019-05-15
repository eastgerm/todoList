import React,{Component} from 'react';
import './InfoLayer.scss';

class InfoLayer extends Component {
  render() {
    let moment = require('moment');

    return (
      <div className='info-layer'>
        <div className='today-info'>
          {moment().format('LL')}
        </div>
        <div className='last-todo-info'>
          못 끝낸 목록
        </div>
        <div className='warning-todo-info'>
          마감 임박 목록
        </div>
      </div>
    );
  }
}

export default InfoLayer;