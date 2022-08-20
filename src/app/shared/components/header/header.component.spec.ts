import { HeaderComponent } from './header.component';
import { getByRole, getByText, render } from '@testing-library/angular';
import { SiteWrapperComponent } from '../site-wrapper/site-wrapper.component';

describe('HeaderComponent', () => {
  async function setup() {
    const { fixture, container } = await render(HeaderComponent, {
      declarations: [
        SiteWrapperComponent,
      ],
    });

    return {
      fixture,
      element: fixture.nativeElement,
      container,
    }
  }


  it('displays app name and logo', async () => {
    const { element } = await setup();

    const title = getByText(element, 'Krill Planner');
    const image = getByRole(element, 'img', { name: 'krill logo' });

    expect(title).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });

});
