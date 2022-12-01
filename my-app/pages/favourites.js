import { useAtom } from 'jotai';
import { Card, Col, Row } from 'react-bootstrap';
import ArtWorkCard from '../components/ArtWorkCard';
import { favouritesAtom } from '../store';

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

  function renderFavourites() {
    if (favouritesList.length > 0) {
      return favouritesList.map((favourite) => {
        return (
          <Col lg={3} key={favourite}>
            <ArtWorkCard objectID={favourite} />
          </Col>
        );
      });
    }
    return (
      <Card>
        <Card.Body>
          <h4>Nothing Here</h4>
          Try adding some new artwork to the list.
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Row className="gy-4">
        {renderFavourites()}
      </Row>
    </>
  );
}
