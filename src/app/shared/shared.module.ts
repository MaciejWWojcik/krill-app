import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { SiteWrapperComponent } from './components/site-wrapper/site-wrapper.component';

const components = [
  FooterComponent,
];

@NgModule({
  declarations: [
    ...components,
    HeaderComponent,
    SiteWrapperComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    ...components,
    MaterialModule,
    HeaderComponent,
    SiteWrapperComponent,
  ]
})
export class SharedModule {
}
