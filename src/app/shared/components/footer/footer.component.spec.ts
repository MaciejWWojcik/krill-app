import { FooterComponent } from './footer.component';
import { getByText, render } from '@testing-library/angular';

describe('FooterComponent', () => {
  async function setup() {
    const { fixture, container } = await render(FooterComponent, {});

    return {
      fixture,
      element: fixture.nativeElement,
      container,
    }
  }


  it('displays app name and logo', async () => {
    const { element } = await setup();

    const footer = getByText(element, 'Created by Jan & Maciej - 2022');

    expect(footer).toBeInTheDocument();
  });

});
