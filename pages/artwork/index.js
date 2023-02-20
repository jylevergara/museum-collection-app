import Error from 'next/error';
import validObjectIDList from '../../public/data/validObjectIDList.json';
import ArtWorkCard from '../../components/ArtWorkCard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Col, Pagination, Row } from 'react-bootstrap';
import useSWR from 'swr';

export default function ArtWork() {
  const PER_PAGE = 12;

  const [artworkList, setArtworkList] = useState();
  const [page, setPage] = useState(1);

  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];

  const {
    data,
    error,
  } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

  useEffect(() => {
    if (data) {
      let results = [];
      let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));

      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      setPage(1);
    }

  }, [data]);

  function previousPage() {
    if (page > 1) {
      setPage(page => page - 1);
    }
  }

  function nextPage() {
    if (page < artworkList.length) {
      setPage(page => page + 1);
    }
  }

  if (error) {
    return <Error statusCode={404} />;
  }

  if (artworkList) {
    const currentArtWorkList = artworkList[page - 1];
    return (
      <>
        <Row className="gy-4">
          {artworkList.length > 0 && currentArtWorkList.map((artworkID) => {
            return (
              <Col lg={3} key={artworkID}>
                <ArtWorkCard objectID={artworkID} />
              </Col>
            );
          })}
          {artworkList.length === 0 && (
            <>
              <h4>Nothing Here</h4>
              Try searching for something else.
            </>
          )}
        </Row>
        {artworkList.length > 0 && (
          <Row>
            <Col>
              <Pagination>
                <Pagination.Prev onClick={previousPage} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage} />
              </Pagination>
            </Col>
          </Row>
        )}
      </>
    );
  } else {
    return null;
  }

}
