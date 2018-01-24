import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import StarIcon from 'material-ui/svg-icons/action/favorite'
import createClass from '../../actions/schoolclass/create'

class CreateClassButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  render() {

    return (
      <div className="CreateGameButton">
        <RaisedButton
          label="Create Class"
          primary={true}
          onClick={this.props.createClass}
          icon={<StarIcon />} />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { createClass })(CreateClassButton)
