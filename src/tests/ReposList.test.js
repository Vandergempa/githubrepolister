import React from 'react';
import { shallow } from 'enzyme';
import { ReposList } from '../components/ReposList';

let wrapper

// This is a new way of dealing with React Hooks:
let setState = jest.fn()
let useStateSpy = jest.spyOn(React, 'useState')
useStateSpy.mockImplementation((init) => [init, setState]);

// We mock the fetch call:
const mockSuccessResponse = {};
const mockJsonPromise = Promise.resolve(mockSuccessResponse);
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
});
jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

beforeEach(() => {
  jest.spyOn(React, 'useEffect').mockImplementation(f => f());

  const props = {
    location: {
      state: {
        repos: [
          {
            name: "app#1"
          },
          {
            name: "app#2"
          },
          {
            name: "app#3"
          }
        ],
        username: "Tomi",
        fetchUserInfo: jest.fn().mockResolvedValue({})
      }
    }
  }

  wrapper = shallow(
    <ReposList
      {...props}
    />
  );
});

afterEach(() => {
  jest.clearAllMocks();
});


test('Should render the ReposList component correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should call fetch on component mount', () => {
  expect(global.fetch).toHaveBeenCalledWith(`https://api.github.com/users/Tomi`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' }
  })
});

test('should call setState after fetch', () => {
  expect(setState).toBeCalled()
});

test('should filter the repos on form change', () => {
  const FormControl = wrapper.find("FormControl")
  expect(FormControl.length).toEqual(1)

  FormControl.prop('onChange')({
    target: {
      value: 'app#2'
    }
  });

  expect(setState).toHaveBeenCalledWith([
    {
      name: "app#2"
    }
  ])
});

