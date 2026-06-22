// redux/rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import LoaderReducer from './reducer/mainreducer';
import Api from './reducer/api';
import ShowModal from './reducer/showmodal';
import Themereducer from './reducer/theme/theme';
import UpdateState from "./reducer/state/state";

export const rootReducer = combineReducers({
  Loader: LoaderReducer,
  Api: Api,
  Modal: ShowModal,
  theme: Themereducer,
  UpdateState: UpdateState,
});

export type RootState = ReturnType<typeof rootReducer>;