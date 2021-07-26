import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSpaseComponent } from './chat-space.component';

describe('ChatSpaseComponent', () => {
  let component: ChatSpaseComponent;
  let fixture: ComponentFixture<ChatSpaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatSpaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatSpaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
