import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import './Student.css'
import {GridTile, GridList} from 'material-ui/GridList'
import { fetchOneClass } from '../actions/schoolclass/fetch'
import { destroyStudent } from '../actions/schoolclass/destroy'
import DatePicker from 'material-ui/DatePicker'
import { updateStudent } from '../actions/schoolclass/update'

import {TITLE_YELLOW, TITLE_RED, TITLE_GREEN, TITLE_WHITE} from './SchoolClass'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
  paperRed: {
    backgroundColor: 'red',
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    cursor: 'pointer',
  },
  paperYellow: {
    backgroundColor: 'yellow',
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    cursor: 'pointer',
  },
  paperGreen: {
    backgroundColor: 'green',
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
    cursor: 'pointer',
  },
  buttonStyle: {
    float: 'right',
    marginLeft: '2rem',
  }
}


class Student extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      evaColor: TITLE_WHITE,
    }
  }

  componentWillMount() {
    const { schoolClass, fetchOneClass } = this.props
    const { classid } = this.props.match.params
    if (!schoolClass) { fetchOneClass(classid) }
  }

  state = {}

  saveStudent(event) {
    event.preventDefault()

    const date = this.refs.date.getDate()
    const { _id  } = this.props.schoolClass
    const student = this.props.student

    const evaluation = this.props.student.evaluations.filter((g) => (
      new Date(g.evaluatedAt).getTime() === date.getTime()))[0]

    const updateEva = !evaluation ? {
      evaluationColor: "RED",
      evaluatedBy: this.props.currentUser._id,
      evaluatedAt: new Date(date.getFullYear(), date.getMonth(), date.getDate() )
    } : {
      _id: evaluation._id,
      evaluationColor: "GREEN",
      evaluatedBy: evaluation.evaluatedBy,
      evaluatedAt: new Date(new Date(evaluation.evaluatedAt).getFullYear(),
                            new Date(evaluation.evaluatedAt).getMonth(),
                            new Date(evaluation.evaluatedAt).getDate())
    }

    const evaluations = student.evaluations.filter((g) => (
      new Date(g.evaluatedAt).getTime() !== date.getTime()))

    const updateStudent = {
      _id: this.props.student._id,
      fullName: this.props.student.fullName,
      photo: this.props.student.photo,
      evaluations: [ { ...updateEva } ].concat(evaluations)
    }
    this.props.updateStudent(_id, updateStudent, this.props.student._id)
  }

  deleteStudent(event) {
    const { classid, studentid } = this.props.match.params
    this.props.destroyStudent(classid, studentid)
  }

  goToClass = classId => event => this.props.push(`/classes/${classId}`)

  getEvaColor(evaColor) {
    switch (evaColor) {
      case "YELLOW":
        return TITLE_YELLOW
      case "RED":
        return TITLE_RED
      case "GREEN":
        return TITLE_GREEN
      default:
        return TITLE_WHITE
    }
  }

  formatDate(date){
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  }

  validateDate(e, date) {
    if (!date) { return null }

    const { student } = this.props
    const evaluation = student.evaluations.filter((g) => (
      new Date(g.evaluatedAt).getTime() === date.getTime()))[0]

    this.setState({
      evaColor: !evaluation ? "WHITE" : this.getEvaColor(evaluation.evaluationColor)
    })

  }

  changeRed(event){
    this.setState({
      evaColor: TITLE_RED,
    });
  }

  changeYellow(event){
    this.setState({
      evaColor: TITLE_YELLOW,
    });
  }

  changeBlue(event){
    this.setState({
      evaColor: TITLE_GREEN,
    });
  }


  render() {
    const { student, schoolClass } = this.props

    if(!student) return null
    if(!schoolClass) return null

    const evaCount = student.evaluations.length
    const evaColor = !!student.evaluations[evaCount-1] ? student.evaluations[evaCount-1].evaluationColor : "WHITE"
    this.getEvaColor(evaColor)


    return (
      <div className="Student">
        <h1>Student</h1>
        <h2>Batch #{schoolClass.batch}</h2>
        <Paper className="paper">
        <div style={styles.root}>
          <GridList cols={4} padding={20} >
            <GridTile
              title={student.fullName}
              titleBackground={ this.state.evaColor}
            >
              <img src={student.photo} alt={student.fullName} />
            </GridTile>

            <Paper
              style={styles.paperRed}
              circle={true}
              onClick={ this.changeRed.bind(this) } />

            <Paper
              style={styles.paperYellow}
              circle={true}
              onClick={ this.changeYellow.bind(this) }
              />

            <Paper
              style={styles.paperGreen}
              circle={true}
              onClick={ this.changeBlue.bind(this) }
              />
          </GridList>
        </div>
        <br/>
        <DatePicker
          formatDate={this.formatDate}
          ref="date"
          hintText="Evaluation date"
          container="inline"
          mode="landscape"
          onChange={this.validateDate.bind(this)}
          errorText={ this.state.startsAtError }
          defaultDate={new Date()}
          />
          <br/>
          <RaisedButton
            onClick={ this.saveStudent.bind(this) }
            label="Save"
            primary={true} />

          <RaisedButton
            onClick={ this.saveStudent.bind(this) }
            label="Save and Next"

            primary={true} />

            <RaisedButton
              onClick={ this.deleteStudent.bind(this) }
              label="Delete"
              style={styles.buttonStyle}
              secondary={true} />
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, classes }, { match }) => {
  const schoolClass = classes.filter((g) => (g._id === match.params.classid))[0]
  const student = !!schoolClass ? schoolClass.students.filter((s) => (s._id === match.params.studentid))[0] : {}
  return {
    schoolClass,
    currentUser,
    student
  }
}

export default connect(mapStateToProps, { push, fetchOneClass, destroyStudent, updateStudent })(Student)
