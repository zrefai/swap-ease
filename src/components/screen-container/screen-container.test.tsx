import { shallow } from 'enzyme';
import { ScreenContainer } from './screen-container';

describe('ScreenContainer', () => {
  it('matches snapshot', () => {
    const wrapper = shallow(
      <ScreenContainer>
        <div />
      </ScreenContainer>
    );
    expect(wrapper.getElement()).toMatchSnapshot();
  });
});
