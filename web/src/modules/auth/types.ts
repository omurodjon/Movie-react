export namespace IEntity {
  export interface User {
    id: string;
    name: string;
    email: string;
  }
}

export namespace IForm {
  export interface Login {
    email: string;
    password: string;
  }
  export interface Register extends IForm.Login {
    name: string;
  }
}

export namespace IApi {
  export namespace Login {
    export interface Request extends IForm.Login {}
    export interface Response {
      data: string;
    }
  }
  export namespace Register {
    export interface Request extends IForm.Register {}
    export type Response = IEntity.User;
  }
  export namespace Profile {
    export type Response = IEntity.User;
  }
}

export interface IContext {
  user: IEntity.User | null;
  methods: {
    logout(): void;
    login(user: IEntity.User): void;
  };
}
