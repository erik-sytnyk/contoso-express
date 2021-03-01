import {Model, ModelCtor} from 'sequelize';

interface User {
  id: number;
  email: string;
  profile: {
    local?: LocalProfile;
    google?: GoogleProfile;
  };
  getFullName(): string;
}

interface LocalProfile {
  password: boolean;
  isActivated: boolean;
  activation: {
    created: string;
    token: string;
  };
  reset: {
    created: string;
    token: string;
  };
}

interface GoogleProfile {
  id: number;
  token: string;
  name: string;
  email: string;
}

interface UserInstance extends Model, User {}

export interface UserModel extends ModelCtor<UserInstance> {
  generateHash: (password: string) => void;
}
