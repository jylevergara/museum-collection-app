import ArtworkCardDetail from '../../../my-app/components/ArtWorkCardDetail.js';
import { useRouter } from 'next/router';
import { Col, Row } from 'react-bootstrap';

export default function ArtworkById() {
  const router = useRouter();
  const { objectID } = router.query;

  return (
    <Row>
      <Col>
        <ArtworkCardDetail objectID={objectID} />
      </Col>
    </Row>
  );

}
