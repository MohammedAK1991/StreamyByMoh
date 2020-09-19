import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions'
import { Link } from 'react-router-dom';

class StreamList extends React.Component{
  
  componentDidMount() {
    this.props.fetchStreams()
  }

  renderAdmin(stream) {
    if(stream.userId === this.props.currentUserId) {
      return (
        <div className="right floated content"> 
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">EDIT</Link> 
          <Link to={`/streams/delete/${stream.id}`} className="ui button negative">DELETE</Link> 
          {/* <button className="ui button negative">DELETE</button>  */}
        </div>
      )
    }
  }

  renderCreate() {
    if(this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right'}}>
          <Link to='/streams/new'className="ui button primary"  >
            Create a Stream
          </Link>
        </div>
      )
    }
  }

  renderList() {
    return this.props.streams.map(stream => {
      return (
        <div key={stream.id} className="item">
          {this.renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      )
    })
  }

  render() {
    //console.log(this.props);
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list"> { this.renderList()} </div>
        {this.renderCreate()}
      </div>
      
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    streams: Object.values(state.streams), //this will reverse the weird thingg we did with mapKeys of lodash
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn //This is for the link to create a stream button
  } 
}

export default connect( mapStateToProps, { fetchStreams } )(StreamList) ;