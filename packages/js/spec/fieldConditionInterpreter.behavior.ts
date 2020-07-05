import { expect, spy } from './specHelper';
import { FieldCondition as Field, ITSELF } from '@ucast/core';
import { createJsInterpreter, JsOperator } from '../src';

export function includeExamplesForFieldCondition(name: string, interpreter: JsOperator<any, any>, defaultValue: unknown = 1) {
  const operators = { [name]: interpreter };

  it('uses "get" function from context to retrieve object value', () => {
    const condition = new Field(name, 'value', defaultValue);
    const object = { value: condition.value };
    const get = spy((object: Record<string, any>, field: string) => object[field]);
    const customInterpret = createJsInterpreter(operators, { get });
    customInterpret(condition, object);

    expect(get).to.have.been.called.with(object, condition.field);
  })
}

export function includeExamplesForEqualityInterpreter(name: string, interpreter: JsOperator<any, any>, defaultValue: unknown = []) {
  const operators = { [name]: interpreter };

  it('uses "equal" function from context to check equality of values', () => {
    const condition = new Field(name, 'value', defaultValue);
    const equal = spy(<T>(a: T, b: T) => a === b);
    const object = { value: condition.value };
    const interpret = createJsInterpreter(operators, { equal });
    interpret(condition, object);

    expect(equal).to.have.been.called.with(condition.value, object.value);
  })
}