'use client'
  import React, { useState, useEffect } from 'react';
  import MessageInput from '../components/MessageInput';
  import MessageBox from '../components/MessageBox';
  import NominateName from './NominateName';
  import Sidebar from './Sidebar';
  
  const Home = () => {
    const [nominatedName, setNominatedName] = useState('');
    const [isNameModalOpen, setNameModalOpen] = useState(false);
  
    const handleNominateName = async () => {
      try {
        const uid = sessionStorage.getItem('uid');
        const receiverId = 3907;
        const receiverClass = 'User';
  
        const url = `http://206.189.91.54/api/v1/messages?receiver_id=${receiverId}&receiver_class=${receiverClass}`;
  
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('access-token', sessionStorage.getItem('access-token'));
        headers.append('client', sessionStorage.getItem('client'));
        headers.append('expiry', sessionStorage.getItem('expiry'));
        headers.append('uid', sessionStorage.getItem('uid'));
  
        const response = await fetch(url, {
          method: 'GET',
          headers: headers,
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
  
        const messageWithMatchingUid = data.data.find((message) => {
          const uidIndex = message.body.indexOf(`uid: ${uid}`);
          return uidIndex !== -1;
        });
  
        if (messageWithMatchingUid) {
          const bodyParts = messageWithMatchingUid.body.split(' ');
          const nameIndex = bodyParts.indexOf('name:');
          if (nameIndex !== -1 && nameIndex + 1 < bodyParts.length) {
            setNominatedName(bodyParts[nameIndex + 1]);
          }
        }
      } catch (error) {
        console.error('Error retrieving messages:', error);
      }
    };

    useEffect(() => {
      handleNominateName();
    }, []);
  
    const closeName = async () => {
      setNameModalOpen(false);
      console.log('closeMemberModal');
      await handleNominateName();
    };
  
    const shouldShowNominateName = !nominatedName;
  
    return (
      <>
      <Sidebar />
        {shouldShowNominateName && <NominateName closeName={closeName}  />}
        <h1>This is the Homepage for this App</h1>
        <div className="text-md">Display name here: <span className="text-lg">{nominatedName}</span></div>
        <MessageBox />
        <MessageInput />
      </>
    );
  };
  
  export default Home;