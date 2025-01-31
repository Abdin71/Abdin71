import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { getQuotes } from '../fetch';
import {
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Quotes = () => {
  const navigate = useNavigate();
  const [qouteData, setQouteData] = useState("");

  useEffect(() => {
    //Fetch quote data
    const fetchData = async () => {
      const quotes = await getQuotes();
      setQouteData(quotes);
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <div>
          <Tabs
            defaultActiveKey="Quotes"
            id="fill-tab-example"
            className="mb-3"
            onSelect={(eventKey) => {
              if (eventKey === "Home") navigate("/");
            }}
          >
            <Tab eventKey="Home" title="Books">
            </Tab>
            <Tab eventKey="Quotes" title="Quotes">
            </Tab>

          </Tabs>

        </div>

        <div className="container d-flex flex-column align-items-center justify-content-around gap-3">
          <Button className="mb-3" as={Link} to="/addQuote">
            <FontAwesomeIcon icon={faPlus} size="xs" title="Add" className="fa-solid mx-2" />Add Quote
          </Button>
          {qouteData && qouteData.map((quote, index) => (
            <Card className="text-center w-50 p-2" key={index}>
              <Card.Header>Quote</Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>
                    {' '}
                    {quote.quote}
                    {' '}
                  </p>
                  <footer className="blockquote-footer">
                    {quote.author} in <cite title="Source Title">{quote.book}</cite>
                  </footer>
                </blockquote>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>

    </>
  );

}; export default Quotes;


