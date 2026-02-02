import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpSettingsComponent } from './settings.component';
import { FormsModule } from '@angular/forms';

describe('EmpSettingsComponent', () => {
  let component: EmpSettingsComponent;
  let fixture: ComponentFixture<EmpSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpSettingsComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(EmpSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the settings component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle darkMode setting', () => {
    component.darkMode = true;
    expect(component.darkMode).toBeTrue();
  });

  it('should update greeting message', () => {
    component.greeting = 'Hello, world!';
    expect(component.greeting).toBe('Hello, world!');
  });
});
