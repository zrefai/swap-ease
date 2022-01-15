import { NavBar } from './nav-bar';
import { useLocation, useNavigate } from 'react-router-dom';
import { shallow } from 'enzyme';
import { Button } from '@mui/material';
import { NavigationConfig } from '../../navigation/navigator/routes';

jest.mock('react-router-dom');
const useLocationMock = useLocation as jest.Mock;
const useNavigateMock = useNavigate as jest.Mock;

describe('NavBar', () => {
  beforeEach(() => {
    useLocationMock.mockReturnValue({ pathname: '/' });
    useNavigateMock.mockReturnValue(jest.fn());
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<NavBar />);
    expect(wrapper.getElement()).toMatchSnapshot();
  });

  it('has primary color on button for root route', () => {
    const wrapper = shallow(<NavBar />);
    const rootButton = wrapper
      .find(Button)
      .filterWhere((b) => b.text() === 'Wallet');
    expect(rootButton.props().color).toEqual('primary');
  });

  it('has secondary color on non-active route', () => {
    const navigateMock = jest.fn();
    useNavigateMock.mockReturnValueOnce(navigateMock);

    const wrapper = shallow(<NavBar />);

    const getTradingButton = () =>
      wrapper.find(Button).filterWhere((b) => b.text() === 'Trading');

    const tradingButton = getTradingButton();
    expect(tradingButton.props().color).toEqual('secondary');
  });

  it('calls navigate with correct route', () => {
    const navigateMock = jest.fn();
    useNavigateMock.mockReturnValueOnce(navigateMock);

    const wrapper = shallow(<NavBar />);

    const getTradingButton = () =>
      wrapper.find(Button).filterWhere((b) => b.text() === 'Trading');

    const tradingButton = getTradingButton();
    const onClick = tradingButton.props().onClick;
    if (onClick) {
      onClick({} as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>);
    }
    expect(navigateMock).toHaveBeenCalledWith(NavigationConfig.trading.route, {
      replace: true,
    });
  });
});
