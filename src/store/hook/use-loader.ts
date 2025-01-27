import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store';
import { hide, LoaderVariant, LoaderScope, show } from '../features/loader';

export interface ShowLoaderPropsType {
  message?: string;
  variant?: LoaderVariant;
  scope?: LoaderScope,
  isTransparentBg?: boolean
}

export function useLoader() {
  const dispatch = useDispatch()
  const loaderState = useSelector((state: RootState) => state.loader)

  const showLoader = (options?: ShowLoaderPropsType) => {
    dispatch(show(options || {}))
  }

  const hideLoader = () => {
    dispatch(hide())
  }

  return {
    ...loaderState,
    show: showLoader,
    hide: hideLoader
  }
}

