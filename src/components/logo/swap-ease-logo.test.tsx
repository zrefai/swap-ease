import { shallow } from 'enzyme';
import { SwapEaseLogo } from './swap-ease-logo';

describe('SwapEaseLogo', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<SwapEaseLogo />);
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});
