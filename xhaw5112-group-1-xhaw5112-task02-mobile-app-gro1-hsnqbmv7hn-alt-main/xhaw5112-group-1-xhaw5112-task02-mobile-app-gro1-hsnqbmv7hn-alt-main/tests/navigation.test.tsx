import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import App from '../App';

describe('app navigation', () => {
  it('renders the home screen and switches between all four tabs', async () => {
    render(<App />);

    expect(await screen.findByTestId('screen-home')).toBeTruthy();

    fireEvent.press(screen.getByTestId('tab-Explore'));
    await waitFor(() => expect(screen.getByTestId('screen-explore')).toBeTruthy());

    fireEvent.press(screen.getByTestId('tab-Calculate'));
    await waitFor(() => expect(screen.getByTestId('screen-calculate')).toBeTruthy());

    fireEvent.press(screen.getByTestId('tab-Arena'));
    await waitFor(() => expect(screen.getByTestId('screen-contact')).toBeTruthy());

    fireEvent.press(screen.getByTestId('tab-Home'));
    await waitFor(() => expect(screen.getByTestId('screen-home')).toBeTruthy());
  });
});
