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

const TITLE_YELLOW = "linear-gradient(to top, rgba(190,190,0,0.7) 0%,rgba(190,190,0,0.3) 70%,rgba(190,190,0,0) 100%)"
const TITLE_RED = "linear-gradient(to top, rgba(190,0,0,0.7) 0%,rgba(190,0,0,0.3) 70%,rgba(190,0,0,0) 100%)"
const TITLE_BLUE = "linear-gradient(to top, rgba(0,0,190,0.7) 0%,rgba(0,0,190,0.3) 70%,rgba(0,0,190,0) 100%)"
const TITLE_WHITE = "linear-gradient(to top, rgba(190,190,190,0.7) 0%,rgba(190,190,190,0.3) 70%,rgba(190,190,190,0) 100%)"

const getEvaColor = (evaColor) => {
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
    console.log("entra");
    const { schoolClass } = this.props
    this.props.push(`/classes/${schoolClass._id}/students`)
  }


  renderStudent(student) {
    const evaCount = student.evaluations.length
    const evaColor = !!student.evaluations[evaCount-1] ? student.evaluations[evaCount-1].evaluationColor : "WHITE"

    const color = getEvaColor(evaColor)


    return (<GridTile
      key={student.photo}
      title={student.fullName}
      titleBackground={color}
      titleStyle={styles.titleStyle}
    >
      <img className="imgover" src={student.photo} alt={student.fullName} />
    </GridTile>
    )
  }

  render() {
    const { schoolClass } = this.props

    if(!schoolClass) return null

    return(
      <div className="ClassContainer">
        <h1>Batch #{schoolClass.batch}</h1>
        <RaisedButton
          onClick={ this.newStudent.bind(this) }
          label="New Student"
          primary={true} />
        <Paper className="paper">

        <LinearProgress color="red" mode="determinate" value={20} />
        <LinearProgress color="yellow" mode="determinate" value={30} />
        <LinearProgress color="blue" mode="determinate" value={50} />
        <br/>
          <div style={styles.root}>
            <GridList cols={3} padding={20} >
              {schoolClass.students.map(this.renderStudent)}
            </GridList>
          </div>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, classes }, { match }) => {
  const schoolClass = classes.filter((g) => (g._id === match.params.classid))[0]
  return {
    schoolClass,
  }
}

export default connect(mapStateToProps, { fetchOneClass, push })(SchoolClass)
