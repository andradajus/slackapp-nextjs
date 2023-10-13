

const NominateName = () => {
    const [receiverId, setReceiverId] = useState('');
    const [messageBody, setMessageBody] = useState('');
  
    const handleSendMessage = () => {
      const requestBody = {
        receiver_id: receiverId,
        receiver_class: 'User',
        body: messageBody
      };
  
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('access-token', sessionStorage.getItem('access-token'));
      headers.append('client', sessionStorage.getItem('client'));
      headers.append('expiry', sessionStorage.getItem('expiry'));
      headers.append('uid', sessionStorage.getItem('uid'));
  
      fetch('http://206.189.91.54/api/v1/messages', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Message sent successfully:', data);
        })
        .catch(error => {
          console.error('Error sending message:', error);
        });
    };
  
    return (
        <>
        <span>Nominate Name Modal</span>
      <div className="bg-blue-200">
        <input
        className="border-red-200 p-5"
          type="text"
          placeholder="Receiver ID"
          value={receiverId}
          onChange={e => setReceiverId(e.target.value)}
        />
        <textarea
          placeholder="Message body"
          value={messageBody}
          onChange={e => setMessageBody(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send Message</button>
      </div>
      </>
    );
  };

export default NominateName