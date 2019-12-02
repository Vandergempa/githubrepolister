import React from 'react';
import { shallow } from 'enzyme';
import ProfileCard from '../components/ProfileCard';

let wrapper

beforeEach(() => {
  const userInfo = {
    "login": "octocat",
    "avatar_url": "https://github.com/images/error/octocat_happy.gif",
    "url": "https://api.github.com/users/octocat",
    "html_url": "https://github.com/octocat",
    "name": "monalisa octocat",
    "bio": "There once was...",
    "public_repos": 2,
    "followers": 20,
    "following": 0,
    "created_at": "2008-01-14T04:33:35Z",
    "updated_at": "2008-01-14T04:33:35Z"
  }

  wrapper = shallow(
    <ProfileCard
      userInfo={userInfo}
    />
  );
});

test('Should render ProfileCard component correctly', () => {
  expect(wrapper).toMatchSnapshot();
});