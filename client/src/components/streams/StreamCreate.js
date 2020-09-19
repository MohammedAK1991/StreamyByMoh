import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {
  onSubmit = (formValues) =>  { //no event object passed unlike the usual DOM system instead only the data that was entered is passed as an object
    //console.log(formValues);
    this.props.createStream(formValues);
    //after the above step, the action creator makes an api request to json-server to create a stream with a post request
  }

  render() {
    //console.log(this.props); //Do this coz you will forget the features thay redux form provides such as value and onSubmit methods which in a normal react component had to be defined and wired manually to make the component controlled
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    )  
  }
}


export default connect(null, { createStream })(StreamCreate);