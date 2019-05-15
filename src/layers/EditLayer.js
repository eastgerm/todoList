import React,{Component} from 'react';
import './EditLayer.scss';
import {getFireDB} from "../Firebase";
import _ from 'lodash';

class EditLayer extends Component {
  state = {
    memos: null
  };
  componentDidMount() {
    getFireDB()
      .then(res => {
        this.setState({
          names: res.val().memos
        })
      });
  }

  render() {
    return (
      <div className='edit-layer'>
        edit layer
        {_.map(this.state.names,name => <div>{name.name}</div>)}
      </div>
    );
  }
}

export default EditLayer;