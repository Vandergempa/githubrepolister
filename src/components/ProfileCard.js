import React from "react"

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const ProfileCard = (props) => {
  const { userInfo } = props
  return (
    <Card className="col-xs-5 col-sm-6 m-5 text-center mb-auto">
      <Card.Img className="rounded-circle ml-auto mr-auto mt-2" variant="top" src={userInfo.avatar_url} style={{ width: '13rem' }} />
      <Card.Body>
        <Card.Title>{userInfo.name}</Card.Title>
        <Card.Text>
          <em>{userInfo.bio}</em>
        </Card.Text>
        <hr></hr>
        <Card.Text>
          Public repos: {userInfo.public_repos}
        </Card.Text>
        <Card.Text>
          Followers: {userInfo.followers} | Following: {userInfo.following}
        </Card.Text>
        <Card.Text>
          Created at: {userInfo.created_at}
        </Card.Text>
        <Button variant="primary" href={userInfo.html_url} >Go to profile</Button>
      </Card.Body>
    </Card>
  )
}

export default ProfileCard