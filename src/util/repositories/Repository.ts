import { v4 as uuid } from 'uuid';

abstract class Repository<T> {
  protected props: T;
  protected _id: string;

  constructor(props: T, id?: string) {
    this.props = props;
    this._id = id ?? uuid();
  }
}

export { Repository };
