import { useAtom } from 'jotai';
import Error from 'next/error';
import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import useSWR from 'swr';
import { favouritesAtom } from '../store';

export default function ArtWorkCardDetail(props) {
  const { objectID } = props;
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(favouritesList.includes(objectID));

  const {
    data,
    error,
  } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);

  function favouritesClicked() {
    if (showAdded) {
      setFavouritesList(current => current.filter(fav => fav != objectID));
      setShowAdded(false);
    } else {
      setFavouritesList(current => [...current, objectID]);
      setShowAdded(true);
    }
  }

  if (error) {
    return <Error statusCode={404} />;
  }
  if (data) {
    const artwork = data;
    return (
      <>
        <Card>
          {artwork.primaryImage && (
            <Card.Img variant="top" src={artwork.primaryImage} />
          )}
          <Card.Body>
            <Card.Title>{artwork.title ? artwork.title : 'N/A'}</Card.Title>
            <Card.Text>
              <strong>Date: </strong> {artwork.objectDate ? artwork.objectDate : 'N/A'}
              <br />
              <strong>Classification: </strong> {artwork.classification ? artwork.classification : 'N/A'}
              <br />
              <strong>Medium: </strong> {artwork.medium ? artwork.medium : 'N/A'}
              <br />
              <br />
              <strong>Artist: </strong> {artwork.artistDisplayName ? artwork.artistDisplayName : 'N/A'} {' ('}
              {artwork.artistDisplayName && (
                <a href={artwork.artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a>
              )}
              {')'}
              <br />
              <strong>Classification: </strong> {artwork.creditLine ? artwork.creditLine : 'N/A'}
              <br />
              <strong>Medium: </strong> {artwork.dimensions ? artwork.dimensions : 'N/A'}
            </Card.Text>
            <Button variant={showAdded ? 'primary' : 'outline-primary'} onClick={favouritesClicked}>
              + Favorite {showAdded ? '(added)' : ''}
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  }
  return null;

}
