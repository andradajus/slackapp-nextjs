'use client'
import {useState} from 'react'

const NominateName = ({closeName}) => {
    const [nominatedName, setNominatedName] = useState('');
    const uid = sessionStorage.getItem('uid');
  
    const handleNominateName = () => {
      const requestBody = {
        receiver_id: 3907,
        receiver_class: 'User',
        body: `uid: ${uid} name: ${nominatedName}`,
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
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Message sent successfully:', data);
          closeName(); 
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });
    };
  
    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5">
                <h5 className="text-3xl font-semibold">Create Channel Here</h5>
              </div>
  
              <div className="relative p-6 flex-auto">
                Please tell us your name?
                <input
                  className="border-red-200"
                  type="text"
                  placeholder="Nominate Name"
                  value={nominatedName}
                  onChange={(e) => setNominatedName(e.target.value)}
                />
              </div>
  
              <div className="flex items-center justify-end p-6">
                <button
                  className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleNominateName}
                >
                  Submit
                </button>

                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={closeName}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

export default NominateName