import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { getFavourites, getHistory } from '../lib/userData';
import { favouritesAtom, searchHistoryAtom, userTokenAtom } from '../store';

const PUBLIC_PATHS = ['/login', '/', '/_error', 'register'];


export default function RouteGuard(props) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const [token, setToken] = useAtom(userTokenAtom);

  const updateAtoms = useCallback(async () => {
    if(token) {
      setFavouritesList(await getFavourites());
      setSearchHistory(await getHistory());
    }
  },[setFavouritesList, setSearchHistory, setToken])

  useEffect(() => {
    updateAtoms()
      .then(r => null);
  }, [updateAtoms]);

  return <>{props.children}</>;
}
