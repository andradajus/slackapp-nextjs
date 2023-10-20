
export interface User {
  id: number;
  uid: string;
}

export interface Message {
  id: number;
  uid: string,
  sender: User;
  text: string;
}

export interface MessageInputProps {
  receiverId: number;
  setMessages: (messages: Message[]) => void;
  loggedInUser: User;
  messages: Message[];
}
