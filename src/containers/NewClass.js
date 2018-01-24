import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import newClass from '../actions/schoolclass/create'
import Title from '../components/ui/Title'
import DatePicker from 'material-ui/DatePicker';


const dialogStyle = {
  width: '400px',
  margin: '50px auto',
  padding: '2rem',
}

export class NewClass extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    newClass: PropTypes.func.isRequired,
  }

  state = {}

  submitForm(event) {
    event.preventDefault()
    const starts = this.refs.startsAt.getDate()
    const ends = this.refs.endsAt.getDate()

    if (this.validateAll(starts, ends)) {
      const schoolClass = {
        batch: this.refs.batch.getValue(),
        startsAt: this.refs.startsAt.getDate(),
        endsAt: this.refs.endsAt.getDate()
      }
      this.props.newClass(schoolClass)
    }
    return false
  }

  validateAll(starts, ends) {
    return this.validateBatch() &&
      this.validateStartsAt(null, starts) &&
      this.validateEndsAt(null, ends)
  }

  validateBatch() {
    const { batch } = this.refs
    const batchNum = Number(batch.getValue())
    if (batchNum > 0) {
      this.setState({
        batchError: null
      })
      return true
    }

    this.setState({
      batchError: 'Please provide a correct Batch number'
    })
    return false
  }

  validateStartsAt(e, date) {
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

  validateEndsAt(e, date) {
    if (!!date) {
      this.setState({
        endsAtError: null
      })
      return true
    }

    this.setState({
      endsAtError: 'Please provide a correct End date'
    })
    return false
  }

  formatDate(date){
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  }

  render() {
    return (
      <Paper style={ dialogStyle }>
        <Title content="New Class" level={2} />

        <form onSubmit={this.submitForm.bind(this)}>
          <div className="input">
            <TextField ref="batch" type="number" hintText="Batch number"
              onChange={this.validateBatch.bind(this)}
              errorText={ this.state.batchError } />
          </div>
          <DatePicker
            formatDate={this.formatDate}
            ref="startsAt"
            hintText="Starts at"
            container="inline"
            mode="landscape"
            onChange={this.validateStartsAt.bind(this)}
            errorText={ this.state.startsAtError } />
          <DatePicker
            formatDate={this.formatDate}
            ref="endsAt"
            hintText="Ends at"
            container="inline"
            mode="landscape"
            onChange={this.validateEndsAt.bind(this)}
            errorText={ this.state.endsAtError } />
        </form>
        <RaisedButton
          onClick={ this.submitForm.bind(this) }
          label="Create"
          primary={true} />
      </Paper>
    )
  }
}

export default connect(null, { newClass, push })(NewClass)
