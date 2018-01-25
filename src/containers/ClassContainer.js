import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchClasses } from '../actions/schoolclass/fetch'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import './ClassContainer.css'
import {GridList} from 'material-ui/GridList'
import Chip from 'material-ui/Chip'
import {blue300, red300} from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton'

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
}

class ClassContainer extends PureComponent {
  componentWillMount() {
    this.props.fetchClasses()
  }

  newClass(event) {
    this.props.push("/classes/new")
  }

  goToClass = classId => event => this.props.push(`/classes/${classId}`)

  renderClass = (schoolClass, index) => {
    return (
      <Paper
        key={index}
        cols={1}
        rows={1}
      >
        <h1>batch #{schoolClass.batch}</h1>

        <Chip backgroundColor={blue300} >
          { new Date(schoolClass.startsAt).toUTCString() }
        </Chip>

        <Chip backgroundColor={red300} >
          { new Date(schoolClass.endsAt).toUTCString() }
        </Chip>

        <FlatButton label="Go to class"
          primary={true}
          onClick={ this.goToClass(schoolClass._id) }
         />

      </Paper>
    )
  }


  render() {
    return (
      <div className="ClassContainer">
        <h1>Classes</h1>
        <RaisedButton
          onClick={ this.newClass.bind(this) }
          label="Create Class"
          primary={true} />
        <Paper className="paper">
          <div style={styles.root}>
            <GridList cols={3} padding={20} >
              {this.props.classes.map(this.renderClass)}
            </GridList>
          </div>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = ({ classes, currentUser }) => ({ classes, currentUser })

export default connect(mapStateToProps, { fetchClasses, push })(ClassContainer)
