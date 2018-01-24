import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './SchoolClass.css'
import { connect } from 'react-redux'
import { fetchOneClass } from '../actions/schoolclass/fetch'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import {GridList, GridTile} from 'material-ui/GridList'
import LinearProgress from 'material-ui/LinearProgress'

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
    //this.props.push("/classes/")
  }

  renderStudent(tile) {
    return (<GridTile
      key={tile.photo}
      title={tile.fullName}
      titleBackground="linear-gradient(to top, rgba(190,190,0,0.7) 0%,rgba(190,190,0,0.3) 70%,rgba(190,190,0,0) 100%)"
      titleStyle={styles.titleStyle}
    >
      <img className="imgover" src={tile.photo} alt={tile.fullName} />
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
          label="Create Student"
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
  //{//schoolClass.students.map(this.renderStudent)}
const mapStateToProps = ({ currentUser, classes }, { match }) => {
  const schoolClass = classes.filter((g) => (g._id === match.params.classid))[0]
  return {
    schoolClass,
  }
}

export default connect(mapStateToProps, { fetchOneClass })(SchoolClass)
