import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import styles from '../styles/History.module.css';
import { searchHistoryAtom } from '../store';

export default function History() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);


  let parsedHistory = [];
  searchHistory.forEach(h => {
    let params = new URLSearchParams(h);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  function historyClicked(event, index) {
    router.push(`/artwork?${searchHistory}[${index}]`);
  }

  function removeHistoryClicked(e, index) {
    e.stopPropagation(); // stop the event from triggering other events
    setSearchHistory(current => {
        let x = [...current];
        x.splice(index, 1);
        return x;
      },
    );
  }

  function renderHistory() {
    if (parsedHistory.length > 0) {
      return (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => {
              return (
                <ListGroup.Item
                  key={index}
                  className={styles.historyListITem}
                  onClick={(e) => historyClicked(e, index)}
                >
                  {Object.keys(historyItem).map(key => (
                    <Fragment key={key}>{key}: <strong>{historyItem[key]}</strong>&nbsp;</Fragment>))}
                  <Button
                    className="float-end"
                    variant="danger" size="sm"
                    onClick={e => removeHistoryClicked(e, index)}
                  >
                    &times;
                  </Button>
                </ListGroup.Item>
              );
            },
          )}
        </ListGroup>
      );
    }
    return (
      <Card>
        <Card.Body>
          <h4>Nothing Here</h4>
          Try searching for some artwork
        </Card.Body>
      </Card>
    );
  }

  if (!searchHistory) return null;

  return (
    <>
      {renderHistory()}
    </>
  );
}
