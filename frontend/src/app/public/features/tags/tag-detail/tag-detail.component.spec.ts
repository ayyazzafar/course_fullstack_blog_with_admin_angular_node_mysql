import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagDetailComponent } from './tag-detail.component';

describe('TagDetailComponent', () => {
  let component: TagDetailComponent;
  let fixture: ComponentFixture<TagDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
