import { shallow } from 'enzyme';
import { TradingScreen } from './trading.screen';

describe('TradingScreen', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(<TradingScreen />);
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});
