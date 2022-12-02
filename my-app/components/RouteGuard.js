import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { getFavourites, getHistory } from '../lib/userData';
import { favouritesAtom, searchHistoryAtom } from '../store';

const PUBLIC_PATHS = ['/login', '/', '/_error', 'register'];


export default function RouteGuard(props) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  useEffect(() => {
    updateAtoms()
      .then(r => console.log(`r`, r));
  }, [updateAtoms]);

  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  return <>{props.children}</>;
}
