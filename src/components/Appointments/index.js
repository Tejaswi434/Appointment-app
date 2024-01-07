import {Component} from 'react'

import './index.css'

import {format} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointList: [],
    isLiked: false,
  }

  gettingTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  gettingDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  newAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput, appointList, isLiked} = this.state

    const newDateFormat = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy ,EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      Date: newDateFormat,
      starLiked: isLiked,
    }
    this.setState(prevState => ({
      appointList: [...prevState.appointList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  changingTheLike = id => {
    this.setState(prevState => ({
      appointList: prevState.appointList.map(each => {
        if (each.id === id) {
          return {...each, starLiked: !each.starLiked}
        }
        return each
      }),
    }))
  }

  deleteingunstarred = () => {
    this.setState(prevState => ({
      appointList: prevState.appointList.filter(
        each => each.starLiked === true,
      ),
    }))
  }

  render() {
    const {titleInput, dateInput, appointList} = this.state
    return (
      <div className="mainBox">
        <div className="first_box">
          <div>
            <form onSubmit={this.newAppointment}>
              <h1> Add Appointment</h1>
              <label htmlFor="title">Title</label>
              <br />
              <input
                type="text"
                value={titleInput}
                id="title"
                onChange={this.gettingTitleInput}
                placeholder="Title"
              />
              <br />
              <br />
              <label htmlFor=" Date">Date</label>
              <br />
              <input
                id="Date"
                type="date"
                onChange={this.gettingDateInput}
                placeholder="dd/mm/yy"
                value={dateInput}
              />
              <br />
              <br />
              <button className="blueBack" type="submit">
                Add
              </button>
            </form>
          </div>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
        </div>
        <div className="second-box">
          <hr />
          <div className="rowing">
            {' '}
            <h2>Appointments</h2>
            <button
              className="second-button"
              data-testid="star"
              onClick={this.deleteingunstarred}
            >
              Starred
            </button>
          </div>
          <div>
            <br />
            <ul className="innerbox">
              {appointList.map(each => (
                <AppointmentItem
                  each={each}
                  key={each.id}
                  changingTheLike={this.changingTheLike}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments

