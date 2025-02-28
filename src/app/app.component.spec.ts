import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the variable todos`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.todos).toEqual([]);
  });

  it('should render the first todo item with "Removing the wet weather"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span')?.textContent).toContain(
      'Removing the wet weather'
    );
  });
  it('should have a form for user with class "userInput"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.userInput'))).toBeTruthy();
  });
  it('should have a input field of type text', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(
      fixture.debugElement.query(By.css('input[name="userInput"]'))
    ).toBeTruthy();
  });
});
