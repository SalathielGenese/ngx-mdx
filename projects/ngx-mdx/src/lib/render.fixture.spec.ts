import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Type} from '@angular/core';

export async function render<T>(component: Type<T>): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({imports: [component]}).compileComponents();
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
}

describe('no', () => {
  it('op', () => {
    expect(1+1).toBe(2);
  });
});
