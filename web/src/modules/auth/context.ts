import { Types } from 'modules/auth';
import { createContext } from 'react';

const AuthContext = createContext<Types.IContext>({} as Types.IContext);

export default AuthContext;
