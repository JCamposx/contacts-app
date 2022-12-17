import colorType from "@/assets/js/colorType";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { routes, url } from "@/routes/routes";

export default function ContactList({
  contacts,
  onDeleteContact,
  customClass,
}) {
  return (
    <>
      {contacts.map((contact) => {
        return (
          <div key={contact.id} className={`mb-3 ${customClass}`}>
            <Card title={contact.name} customClass="text-center">
              <p className="card-text">{contact.description}</p>
              <p className="card-text">{contact.phone_number}</p>
              <div>
                <Button
                  link={true}
                  to={url(routes.contacts.edit, { id: contact.id })}
                  type={colorType.primary}
                  customClass="me-2"
                >
                  Edit
                </Button>
                <Button
                  type={colorType.danger}
                  onClick={() => onDeleteContact(contact.id)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          </div>
        );
      })}
    </>
  );
}
