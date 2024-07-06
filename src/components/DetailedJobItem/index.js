import Cookies from 'js-cookie'

import {Component} from 'react'

class DetailedJobItem extends Component {
  state = {eachJobDetailsList: []}

  componentDidMount() {
    this.getDetailedJobData()
  }

  getDetailedJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    console.log(await response.json())
  }

  render() {
    return (
      <div className="heading" color="#ffffff">
        <h1>Nithin</h1>
      </div>
    )
  }
}

export default DetailedJobItem
