import { v4 as uuid } from 'uuid';

abstract class Service<T> {
  props: T;
  id: string;

  constructor(props: T, id?: string) {
    this.props = props;
    this.id = id ?? uuid();
  }
}

export { Service };
