import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react-native';
import BookDesign, { imageDefault } from './bookDesign';

describe('Book Design Component', () => {
  it('should render correctly', () => {
    const pressMock = jest.fn();

    render(
      <BookDesign
        name="Teste unitário"
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
        onPress={pressMock}
      />,
    );

    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('should render correctly without image', () => {
    const pressMock = jest.fn();

    render(<BookDesign name="Teste unitário" onPress={pressMock} />);

    const image = screen.getByTestId('book_design__image');

    expect(image.props.source.uri).toBe(imageDefault);
  });

  it('should render correctly with onPress', async () => {
    const pressMock = jest.fn();

    render(
      <BookDesign testID="unit" name="Teste unitário" onPress={pressMock} />,
    );

    await act(async () => {
      const buttonPress = screen.getByTestId('book_design__action__unit');

      fireEvent.press(buttonPress);
    });

    expect(pressMock).toBeCalled();
  });
});
