import React from 'react';
import { shallow } from 'enzyme';
import AccordionCard from '../components/AccordionCard';

test('Should render AccordionCard component correctly', () => {
  let wrapper = shallow(
    <AccordionCard
      eventkey={4}
      title={"Ez"}
      body={"Valami"}
    />
  );
  expect(wrapper).toMatchSnapshot();
});