import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store';
import { hide, LoaderVariant, show } from '../features/loader';


export function useLoader() {
  const dispatch = useDispatch()
  const loaderState = useSelector((state: RootState) => state.loader)

  const showLoader = (options?: { message?: string; variant?: LoaderVariant; isGlobal?: boolean }) => {
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

