export interface User {
  firstname: string;
  lastname: string;
  id: number;
  uid: string;
}

export interface Message {
  receiverId: number;
  id: number;
  uid: string;
  sender: User;
  text: string;
}

export interface MessageInputProps {
  receiverId: number;
  setMessages: (messages: Message[]) => void;
  loggedInUser: User;
  messages: Message[];
  fetchMessages: () => void;
}


export interface ForMessageInput {
  id: number;
  sender: User; 
  receiver: User;
  uid: string;
  body: string;
  created_at: string;
  sent: boolean;
}

