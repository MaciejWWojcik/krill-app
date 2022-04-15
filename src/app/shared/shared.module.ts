import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { SiteWrapperComponent } from './components/site-wrapper/site-wrapper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiPickerComponent } from './components/emoji-picker/emoji-picker.component';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { PriorityPipe } from './pipes/priority.pipe';

const components = [
  FooterComponent,
  HeaderComponent,
  SiteWrapperComponent,
  EmojiPickerComponent,
];

@NgModule({
  declarations: [
    ...components,
    PriorityPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    PickerModule,
    EmojiModule,
  ],
    exports: [
        ...components,
        MaterialModule,
        PickerModule,
        EmojiModule,
        PriorityPipe,
    ]
})
export class SharedModule {
}
