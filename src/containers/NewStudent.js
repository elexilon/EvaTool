import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { newStudent } from '../actions/schoolclass/create'
import Title from '../components/ui/Title'
import { fetchOneClass } from '../actions/schoolclass/fetch'


const dialogStyle = {
  width: '400px',
  margin: '50px auto',
  padding: '2rem',
}

export class NewStudent extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    newStudent: PropTypes.func.isRequired,
    schoolClass: PropTypes.object,
    currentUser: PropTypes.object,
  }

  state = {}

  componentWillMount() {
    const { schoolClass, fetchOneClass } = this.props
    const { classid } = this.props.match.params
    if (!schoolClass) { fetchOneClass(classid) }
  }

  submitForm(event) {
    event.preventDefault()

    if (this.validateAll()) {
      const { batch, startsAt, endsAt, students, _id  } = this.props.schoolClass
      const { name, photoLink  } = this.refs

      const newstud = {
        fullName: name.getValue(),
        photo: photoLink.getValue(),
        evaluations: []
      }

      const updateClass = {
        _id,
        batch,
        startsAt,
        endsAt,
        students: [ {...newstud} ].concat(students)
      }
      //console.log(updateClass)
      this.props.newStudent(_id, updateClass)
    }
    return false
  }

  validateAll() {
    return this.validateName() &&
      this.validatePhoto()
  }

  validateName() {
    const { name } = this.refs

    if (name.getValue().length > 1) {
      this.setState({
        nameError: null
      })
      return true
    }

    this.setState({
      nameError: 'Please provide the full name'
    })
    return false
  }

  validatePhoto() {
    const { photoLink } = this.refs

    if (photoLink.getValue().length > 1) {
      this.setState({
        photoLinkError: null
      })
      return true
    }

    this.setState({
      photoLinkError: 'Please provide the Photo'
    })
    return false
  }

  render() {
    return (
      <Paper style={ dialogStyle }>
        <Title content="New Student" level={2} />

        <form onSubmit={this.submitForm.bind(this)}>
          <div className="input">
            <TextField ref="name" hintText="Full name"
              onChange={this.validateName.bind(this)}
              errorText={ this.state.nameError } />
          </div>
          <div className="input">
            <TextField ref="photoLink" hintText="Photo link"
              onChange={this.validatePhoto.bind(this)}
              errorText={ this.state.photoLinkError } />
          </div>
        </form>
        <RaisedButton
          onClick={ this.submitForm.bind(this) }
          label="Create"
          primary={true} />
      </Paper>
    )
  }
}

const mapStateToProps = ({ currentUser, classes }, { match }) => {
  const schoolClass = classes.filter((g) => (g._id === match.params.classid))[0]
  return {
    schoolClass,
    currentUser
  }
}

export default connect(mapStateToProps, { newStudent, push, fetchOneClass })(NewStudent)
