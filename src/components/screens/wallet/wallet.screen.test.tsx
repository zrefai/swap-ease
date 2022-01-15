import { Button } from '@mui/material';
import { mount, shallow } from 'enzyme';
import { MoralisContextValue, useMoralis, useNFTBalances } from 'react-moralis';
import { NFTMetadata } from '../../../models/NFTMetadata/NFTMetadata';
import { WalletScreen } from './wallet.screen';
import { walletScreenContent } from './wallet.screen.content';

jest.mock('react-moralis');
const useMoralisMock = useMoralis as jest.Mock;
const useNFTBalancesMock = useNFTBalances as jest.Mock;

const useMoralisMockObject: Partial<MoralisContextValue> = {
  authenticate: jest.fn(),
  isAuthenticated: false,
  account: null,
  logout: jest.fn(),
  isInitialized: false,
};

const nftDataMock1 = {
  name: 'name1',
  metadata: { image: 'imageURL1', name: 'nftName1' } as NFTMetadata,
  token_id: 'token_id1',
  is_valid: true,
};

const nftDataMock2 = {
  name: 'name2',
  metadata: { image: 'imageURL2', name: 'nftName2' } as NFTMetadata,
  token_id: 'token_id2',
  is_valid: true,
};

const nftDataMock3 = {
  name: 'name3',
  metadata: { image: 'imageURL3', name: 'nftName3' } as NFTMetadata,
  token_id: 'token_id3',
  is_valid: false,
};

describe('WalletScreen', () => {
  beforeEach(() => {
    useMoralisMock.mockReturnValue(useMoralisMockObject);
    useNFTBalancesMock.mockReturnValue({
      data: {
        result: [nftDataMock1, nftDataMock2, nftDataMock3],
      },
    });
  });

  it('matches snapshot, sign in button if isAuthenticated is false', () => {
    const wrapper = shallow(<WalletScreen />);
    expect(wrapper.getElement()).toMatchSnapshot();
  });

  it('matches snapshot, displays nfts when isAuthenticated is true', () => {
    useMoralisMock.mockReturnValue({
      ...useMoralisMockObject,
      isAuthenticated: true,
    });
    const wrapper = shallow(<WalletScreen />);
    expect(wrapper.getElement()).toMatchSnapshot();
  });

  it('logouts if isInitialized and account is null', () => {
    const logoutMock = jest.fn();
    useMoralisMock.mockReturnValue({
      ...useMoralisMockObject,
      isInitialized: true,
      logout: logoutMock,
    });

    mount(<WalletScreen />);

    expect(logoutMock).toHaveBeenCalled();
  });

  it('uses authenticate when signing into metamask', () => {
    const authenticateMock = jest.fn();
    useMoralisMock.mockReturnValue({
      ...useMoralisMockObject,
      authenticate: authenticateMock,
    });

    const wrapper = shallow(<WalletScreen />);
    const button = wrapper.find(Button);
    const onClick = button.props().onClick;

    if (onClick) {
      onClick({} as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>);
    }

    expect(authenticateMock).toHaveBeenCalledWith({
      signingMessage: walletScreenContent.authenticationMessage,
    });
  });

  it('does not render nfts when it is not valid', () => {
    useMoralisMock.mockReturnValue({
      ...useMoralisMockObject,
      isAuthenticated: true,
    });

    const wrapper = shallow(<WalletScreen />);

    const firstNFT = wrapper
      .find('img')
      .filterWhere((b) => b.props().src === nftDataMock1.metadata.image);
    expect(firstNFT.exists()).toBeTruthy();

    const secondNFT = wrapper
      .find('img')
      .filterWhere((b) => b.props().src === nftDataMock2.metadata.image);
    expect(secondNFT.exists()).toBeTruthy();

    const thirdNFT = wrapper
      .find('img')
      .filterWhere((b) => b.props().src === nftDataMock3.metadata.image);
    expect(thirdNFT.exists()).toBeFalsy();
  });
});
