import Error from 'next/error';
import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';
import useSWR from 'swr';

export default function ArtWorkCard(props) {
  const { objectID } = props;

  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  if (data) {
    const artwork = data;
    return (
      <>
        <Card style={{ width: '18rem' }}>
          <Card.Img
            variant="top"
            src={artwork.primaryImageSmall ? artwork.primaryImageSmall : 'https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d'}
          />
          <Card.Body>
            <Card.Title>{artwork.title ? artwork.title : 'N/A'}</Card.Title>
            <Card.Text>
              <strong>Date: </strong> {artwork.objectDate ? artwork.objectDate : 'N/A'} <br/>
              <strong>Classification: </strong> {artwork.classification ? artwork.classification : 'N/A'} <br/>
              <strong>Medium: </strong> {artwork.medium ? artwork.medium : 'N/A'}
            </Card.Text>
            <Link href={`artwork/${artwork.objectID}`} passHref>
              <Button variant="primary">{artwork.objectID}</Button>
            </Link>
          </Card.Body>
        </Card>
      </>
    );
  }
}
