import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponentA } from './app.componentA';

describe('AppComponentA', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [AppComponentA]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponentA);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'productiva'`, () => {
    const fixture = TestBed.createComponent(AppComponentA);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('productiva');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponentA);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('productiva app is running!');
  });
});
