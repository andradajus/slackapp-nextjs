export interface User {
  id: number;
  uid: string;
}

export interface Message {
  created_at: string | number | Date;
  receiverId: number;
  id: number;
  uid: string;
  body: string;
  sender: any;
}

export interface MessageInputProps {
  receiverId: number;
  setMessages: (messages: Message[]) => void;
  loggedInUser: User;
  messages: Message[];
  fetchMessages: () => void;
}


