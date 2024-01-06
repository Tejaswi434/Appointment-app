// Write your code here

import './index.css'

const AppointmentItem = props => {
  const {each, changingTheLike} = props
  const {id, title, Date, starLiked} = each
  const image = starLiked
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onChange = () => {
    changingTheLike(id)
  }
  return (
    <li className="main">
      <div className="row_1">
        <p>{title}</p>
        <button className="changebutton" onClick={onChange}>
          {' '}
          <img src={image} />
        </button>
      </div>
      <div>Date : {Date}</div>
    </li>
  )
}

export default AppointmentItem
