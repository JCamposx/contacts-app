import axios from "axios";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import routes from "../../routes/routes.js";

export default function Index() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(routes.contacts.index).then((res) => setData(res.data));
  }, []);

  return (
    <div>
      <h1>Contacts</h1>
      <div className="row justify-content-center align-items-center mt-3">
        {data.map((contact) => {
          return (
            <div key={contact.id} className="col-md-4 mb-3">
              <Card>
                <h5 className="card-title">{contact.name}</h5>
                <p className="card-text">{contact.description}</p>
                <p className="card-text">{contact.phone_number}</p>
                <div>
                  <Button to="#" type="dark">
                    Edit
                  </Button>
                  <Button to="#" type="danger">
                    Delete
                  </Button>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
