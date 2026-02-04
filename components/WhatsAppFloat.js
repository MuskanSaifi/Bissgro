export default function WhatsAppFloat() {
  const url = 'https://wa.me/917303981193?text=Hello%20I%20am%20interested%20in%20your%20services';
  return (
    <a
      href={url}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
}
