import React from 'react';
import { shallow } from 'enzyme';
import RepoInfo from '../components/RepoInfo';

let wrapper

beforeEach(() => {
  const props = {
    location: {
      state: {
        details: {
          created_at: "1992",
          description: "Something",
          forks: 0,
          html_url: "www.github.com",
          homepage: "www.something.com",
          language: "HTML",
          name: "Tom",
          owner: {
            login: "Gempa"
          },
          ssh_url: "something",
          updated_at: "1995",
          watchers: 0
        }
      }
    }
  }
  wrapper = shallow(
    <RepoInfo
      {...props}
    />
  );
});

test('Should render RepoInfo component correctly', () => {
  expect(wrapper).toMatchSnapshot();
});