import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './SchoolClass.css'
import { connect } from 'react-redux'
import { fetchOneClass } from '../actions/schoolclass/fetch'

const studentShape = PropTypes.shape({
  fullName: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  Evaluations: PropTypes.arrayOf(PropTypes.object)
})

class SchoolClass extends PureComponent {
  static propTypes = {
    schoolClass: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      batch: PropTypes.number.isRequired,
      startsAt: PropTypes.string,
      endsAt: PropTypes.string,
      createdBy: PropTypes.object.isRequired,
      students: PropTypes.arrayOf(studentShape)
    })
  }

  componentWillMount() {
    const { schoolClass, fetchOneClass } = this.props
    const { classid } = this.props.match.params
    if (!schoolClass) { fetchOneClass(classid) }
  }

  render() {
    const { batch, startsAt, endsAt } = this.props

    return(
      <article className="SchoolClass">
        <header>
          <h1>batch #{batch}</h1>
        </header>
        <div>
          <p>{ startsAt }</p>
          <p>{ endsAt }</p>
        </div>
      </article>
    )
  }
}

const mapStateToProps = ({ currentUser, classes }, { match }) => {
  const schoolClass = classes.filter((g) => (g._id === match.params.classid))[0]
  return {
    schoolClass
  }
}

export default connect(mapStateToProps, { fetchOneClass })(SchoolClass)
