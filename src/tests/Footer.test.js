import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../components/Footer';

test('Should render Footer component correctly', () => {
  let wrapper = shallow(
    <Footer />
  );
  expect(wrapper).toMatchSnapshot();
});