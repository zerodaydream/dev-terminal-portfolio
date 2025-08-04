import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTimelineComponent } from './company-timeline.component';

describe('CompanyTimelineComponent', () => {
  let component: CompanyTimelineComponent;
  let fixture: ComponentFixture<CompanyTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyTimelineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
