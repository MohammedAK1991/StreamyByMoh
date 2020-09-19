import React from 'react';
import { Field, reduxForm } from 'redux-form';


class StreamForm extends React.Component {
  renderError({ touched,error }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      )
    }
  }

  renderInput = ({ input,label, meta }) => { //we destructured the formProps that was passed to 'component' prop on 'Field' component
  //console.log(meta);//  do this to check the meta property where the errors object from validate function are accessible
    const className = `field ${meta.touched && meta.error ? 'error' : ''}`  
    return (
      <div className={className }>
        <label>{label}</label>
        <input {...input} autoComplete="off" /> 
        {/* <div>{ meta.error }</div> */}
        {this.renderError(meta)}
      </div>
    )
  };

  onSubmit = (formValues) =>  { //no event object passed unlike the usual DOM system instead only the data that was entered is passed as an object
    //console.log(formValues);
    // this.props.createStream(formValues); // because we will be passing the action creator later, therrefore this code will be refactored as below
    this.props.onSubmit(formValues);
    //after the above step, the action creator makes an api request to json-server to create a stream with a post request
  }

  render() {
    //console.log(this.props); //Do this coz you will forget the features thay redux form provides such as value and onSubmit methods which in a normal react component had to be defined and wired manually to make the component controlled
    return (
      //this.props.onSubmit is called and after it does all the good stuff the call back this.onSubmit is called with which we can do whatever we want.Check the state in reduc tools to see the state get updated
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field name="description" component={this.renderInput} label="Enter description" />
        <button className="ui button primary"> Submit </button>
      </form>
    )  
  }
}

//this is how forms are validated in redux-form , if therr are no errors then an empty object is passed othereise the returned object will have a key-value pair corresponding to the invalid field which has an error
//validate function is called everytime when the form is submitted or interacted with
const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'You must enter a title' ;
  }
  if (!formValues.description) {
    errors.description = 'You must enter a description' ;
  }
  //if errors object has a property corresponding to one of the 'Field' 'names' then that error message is passed onto this.renderInput (super confusing I know)
  return errors ;
}
//below is how we  pass validate function to the redux-form
//removing the below since there is no more connect function
// const formWrapped = reduxForm({
//   form: 'streamCreate',
//   validate
// })(StreamForm);

export default reduxForm({
  form: 'streamForm',
  validate
})(StreamForm);

//dont need to the connect function anymore since the action creator is gonna be called from the parent component
// export default connect(null, { createStream })(formWrapped);