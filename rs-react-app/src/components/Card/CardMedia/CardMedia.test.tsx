import { render, screen } from '@testing-library/react';
import { CardMedia } from './CardMedia';

describe('CardMedia', () => {
  const renderImage = (props: { src?: string; media_type: string }) => {
    render(
      <CardMedia
        src={props.src}
        alt="Testing image rendering"
        media_type={props.media_type}
      />
    );

    const image = screen.getByRole('img');
    return image;
  };

  it(`should render image with given src and alt with video media_type`, () => {
    const image = renderImage({ src: '/somesrc.img', media_type: 'video' });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/somesrc.img');
    expect(image).toHaveAttribute('alt', 'Testing image rendering');
  });
  it(`should render image with given src and alt with image media_type`, () => {
    const image = renderImage({ src: '/somesrc.img', media_type: 'image' });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/somesrc.img');
    expect(image).toHaveAttribute('alt', 'Testing image rendering');
  });
  it(`should render image with NO_IMAGE src and alt with audio media_type`, () => {
    const image = renderImage({ src: '/somesrc.img', media_type: 'audio' });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/no_image_available.png');
    expect(image).toHaveAttribute('alt', 'Testing image rendering');
  });
});
