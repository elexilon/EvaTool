import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './SchoolClass.css'
import { connect } from 'react-redux'
import { fetchOneClass } from '../actions/schoolclass/fetch'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import {GridList, GridTile} from 'material-ui/GridList'
import LinearProgress from 'material-ui/LinearProgress'
import { push } from 'react-router-redux'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 0, 0)',
    cursor: 'pointer',
  },
}

export const TITLE_YELLOW = "linear-gradient(to top, rgba(190,190,0,0.7) 0%,rgba(190,190,0,0.3) 70%,rgba(190,190,0,0) 100%)"
export const TITLE_RED = "linear-gradient(to top, rgba(190,0,0,0.7) 0%,rgba(190,0,0,0.3) 70%,rgba(190,0,0,0) 100%)"
export const TITLE_GREEN = "linear-gradient(to top, rgba(0,190,0,0.7) 0%,rgba(0,190,0,0.3) 70%,rgba(0,190,0,0) 100%)"
export const TITLE_WHITE = "linear-gradient(to top, rgba(190,190,190,0.7) 0%,rgba(190,190,190,0.3) 70%,rgba(190,190,190,0) 100%)"

const studentShape = PropTypes.shape({
  fullName: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  evaluations: PropTypes.arrayOf(PropTypes.object)
})

class SchoolClass extends PureComponent {
  static propTypes = {
    schoolClass: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      batch: PropTypes.number.isRequired,
      startsAt: PropTypes.string,
      endsAt: PropTypes.string,
      students: PropTypes.arrayOf(studentShape)
    })
  }

  componentWillMount() {
    const { schoolClass, fetchOneClass } = this.props
    const { classid } = this.props.match.params
    if (!schoolClass) { fetchOneClass(classid) }
  }

  newStudent(event) {
    const { schoolClass } = this.props
    this.props.push(`/classes/${schoolClass._id}/students`)
  }

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

  goToClass = studentId => event => this.props.push(`/classes/${this.props.schoolClass._id}/students/${studentId}`)

  getRandomStudent(students)
  {
    const obj_keys = Object.keys(students)
    return students[obj_keys[Math.floor(Math.random() *obj_keys.length)]]
  }

  getStudent(event){
    const { schoolClass } = this.props

    const greenStudents = schoolClass.students.filter(student => this.getLastEvaColor(student.evaluations) === "GREEN")
    const redStudents = schoolClass.students.filter(student => this.getLastEvaColor(student.evaluations)=== "RED")
    const yellowStudents = schoolClass.students.filter(student => this.getLastEvaColor(student.evaluations) === "YELLOW")

    const randNumber = Math.random() * (100 - 1) + 1

    var selectedStudent = null

    if(randNumber > 79) {
      const greenStudent = this.getRandomStudent(greenStudents)
      if(!greenStudent){
        const yellowStudent = this.getRandomStudent(yellowStudents)
        if(!yellowStudent){
          selectedStudent = this.getRandomStudent(redStudents)
        }else {
          selectedStudent = yellowStudent
        }
      }else {
        selectedStudent = greenStudent
      }
    } else if (randNumber > 47) {
      const yellowStudent = this.getRandomStudent(yellowStudents)
      if(!yellowStudent){
        const redStudent = this.getRandomStudent(redStudents)
        if(!redStudent){
          selectedStudent = this.getRandomStudent(greenStudents)
        }else {
          selectedStudent = redStudent
        }
      }else {
        selectedStudent = yellowStudent
      }
    }else{
      const redStudent = this.getRandomStudent(redStudents)
      if(!redStudent){
        const yellowStudent = this.getRandomStudent(yellowStudents)
        if(!yellowStudent){
          this.getRandomStudent(greenStudents)
        }else {
          selectedStudent = yellowStudent
        }
      }else {
        selectedStudent = redStudent
      }
    }
    if(!!selectedStudent){
      this.props.push(`/classes/${schoolClass._id}/students/${selectedStudent._id}`)
    }
  }

  getLastEvaColor(evaluations){
    const evaluation = evaluations.sort(function (a, b) {
      return (new Date(a.evaluatedAt).getTime()) - (new Date(b.evaluatedAt).getTime());
    })[evaluations.length-1]

    return !!evaluation ? evaluation.evaluationColor : "WHITE"
  }

  renderStudent(student, index) {
    const evaColor = this.getLastEvaColor(student.evaluations)

    const color = this.getEvaColor(evaColor)

    return (<GridTile
      key={index}
      title={student.fullName}
      titleBackground={color}
      titleStyle={styles.titleStyle}
      onClick={ this.goToClass(student._id) }
    >
      <img
        className="imgover"
        src={student.photo}
        alt={student.fullName}
        onClick={this.goToClass(student._id)}
      />
    </GridTile>
    )
  }

  render() {
    const { schoolClass } = this.props
    if(!schoolClass) return null

    const greenStudents = schoolClass.students.filter(student => this.getLastEvaColor(student.evaluations) === "GREEN")
    const redStudents = schoolClass.students.filter(student => this.getLastEvaColor(student.evaluations)=== "RED")
    const yellowStudents = schoolClass.students.filter(student => this.getLastEvaColor(student.evaluations) === "YELLOW")

    const greenCount = greenStudents.length
    const redCount = redStudents.length
    const yellowCount = yellowStudents.length
    const maxStudents = greenCount + redCount + yellowCount

    return(
      <div className="ClassContainer">
        <h1>Batch #{schoolClass.batch}</h1>
        <RaisedButton
          onClick={ this.newStudent.bind(this) }
          label="New Student"
          primary={true} />

          <RaisedButton
            label="Ask a question"
            primary={true}
            onClick={this.getStudent.bind(this)}
             />

        <Paper className="paper">

        <LinearProgress color="red" mode="determinate" value={redCount} max={maxStudents} />
        <LinearProgress color="yellow" mode="determinate" value={yellowCount} max={maxStudents} />
        <LinearProgress color="green" mode="determinate" value={greenCount} max={maxStudents} />
        <br/>
          <div style={styles.root}>
            <GridList cols={3} padding={20} >
              {schoolClass.students.map(this.renderStudent.bind(this))}
            </GridList>
          </div>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ classes }, { match }) => {
  const schoolClass = classes.filter((g) => (g._id === match.params.classid))[0]
  return {
    schoolClass,
  }
}

export default connect(mapStateToProps, { fetchOneClass, push })(SchoolClass)
