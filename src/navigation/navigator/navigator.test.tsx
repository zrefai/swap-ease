import { shallow } from 'enzyme';
import { Navigator } from './navigator';

jest.mock('react-router-dom');

describe('Navigator', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<Navigator />);
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});
