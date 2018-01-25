import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import './Student.css'
import {GridTile, GridList} from 'material-ui/GridList'
import { fetchOneClass } from '../actions/schoolclass/fetch'
import DatePicker from 'material-ui/DatePicker'

import {TITLE_YELLOW, TITLE_RED, TITLE_BLUE, TITLE_WHITE} from './SchoolClass'

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
  paperBlue: {
    backgroundColor: 'blue',
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
    };
  }

  componentWillMount() {
    const { schoolClass, fetchOneClass } = this.props
    const { classid } = this.props.match.params
    if (!schoolClass) { fetchOneClass(classid) }
  }

  state = {}

  newClass(event) {
    this.props.push("/classes/new")
  }

  goToClass = classId => event => this.props.push(`/classes/${classId}`)

  getEvaColor(evaColor) {
    switch (evaColor) {
      case "YELLOW":
        return TITLE_YELLOW
      case "RED":
        return TITLE_RED
      case "BLUE":
        return TITLE_BLUE
      default:
        return TITLE_WHITE
    }
  }

  formatDate(date){
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  }

  validateDate(e, date) {
    if (!!date) {
      this.setState({
        startsAtError: null
      })
      return true
    }

    this.setState({
      startsAtError: 'Please provide a correct Start date'
    })
    return false
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
      evaColor: TITLE_BLUE,
    });
  }


  render() {
    const { student, schoolClass } = this.props


    if(!schoolClass) return null

    const evaCount = student.evaluations.length
    const evaColor = !!student.evaluations[evaCount-1] ? student.evaluations[evaCount-1].evaluationColor : "WHITE"
    const color = this.getEvaColor(evaColor)

    return (
      <div className="Student">
        <h1>Student</h1>
        <h2>Batch #{schoolClass.batch}</h2>
        <Paper className="paper">
        <div style={styles.root}>
          <GridList cols={4} padding={20} >
            <GridTile
              title={student.fullName}
              titleBackground={ color !== TITLE_WHITE ? color : this.state.evaColor}
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
              style={styles.paperBlue}
              circle={true}
              onClick={ this.changeBlue.bind(this) }
              />
          </GridList>
        </div>
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

          <RaisedButton
            onClick={ this.newClass.bind(this) }
            label="Delete"
            secondary={true} />

          <RaisedButton
            onClick={ this.newClass.bind(this) }
            label="Save"
            style={styles.buttonStyle}
            primary={true} />

          <RaisedButton
            onClick={ this.newClass.bind(this) }
            label="Save and Next"
            style={styles.buttonStyle}
            primary={true} />
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, classes }, { match }) => {
  const schoolClass = classes.filter((g) => (g._id === match.params.classid))[0]
  const student = !!schoolClass ? schoolClass.students.filter((s) => (s._id === match.params.studentid))[0] : []
  return {
    schoolClass,
    currentUser,
    student
  }
}

export default connect(mapStateToProps, { push, fetchOneClass })(Student)
