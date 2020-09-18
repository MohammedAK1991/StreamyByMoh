import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut} from '../actions';

class GoogleAuth extends React.Component {
  //not required after redux refactor to manage state
  // state = { isSignedIn: null};

  componentDidMount() {
    window.gapi.load('client:auth2', ()=> {
      window.gapi.client.init({
        clientId: '841754130426-en4pl05bsf4l6dpr97r0ua2j19q7bpm3.apps.googleusercontent.com',
        scope: 'email'
      }).then(()=> {
        this.auth = window.gapi.auth2.getAuthInstance();
        //not required after redux refactor
        // this.setState({ isSignedIn : this.auth.isSignedIn.get()})
        //but we need to call this.onAuthChange instead at initialization (made compliccated coz of redux so relax)
        this.onAuthChange(this.auth.isSignedIn.get())
        this.auth.isSignedIn.listen(this.onAuthChange);
      })
    });
  }

  onAuthChange = (isSignedIn) => {
    if(isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut(this.auth.currentUser.get().getId());
    }
  }

  renderAuthButton () {
    if (this.props.isSignedIn == null ) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
          <button onClick={this.onSignOutClick} className="ui red google button ">
            <i className="google icon" />
            Sign Out
        </button>
      )  
    } else {
      return (
          <button onClick={this.onSignInClick} className="ui blue google button ">
            <i className="google icon" />
            Sign In with Google
          </button>
      )  
    }
  }

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  render() {
    return <div>{this.renderAuthButton()}</div>
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps,{ signOut, signIn})(GoogleAuth);