import React from 'react';
import { shallow } from 'enzyme';
import { Landing } from '../components/Landing';

let history, wrapper
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
  history = { push: jest.fn() };
  wrapper = shallow(
    <Landing
      history={history}
      username={"vandergempa"}
    />
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test('Should render the Landing component correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

// As state hooks are internal to the components and thus can't be tested by calling them,
// we test them in a different way:
test('should call setState on form change', () => {
  const FormControl = wrapper.find("FormControl")
  expect(FormControl.length).toEqual(1)

  FormControl.prop('onChange')({
    target: {
      value: 'book'
    },
  });

  expect(setState).toHaveBeenCalledWith("book")
});

test('should call handleButtonClick on button click', () => {
  const Button = wrapper.find("Button")
  expect(Button.length).toEqual(1)

  Button.simulate('click');

  expect(global.fetch).toHaveBeenCalledTimes(1)
  expect(global.fetch).toHaveBeenCalledWith(`https://api.github.com/users/vandergempa/repos`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' }
  })
});
