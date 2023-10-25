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
  map(arg0: (message: { sender: { id: any; firstname: string | number | boolean | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | import("react").ReactPortal | import("react").PromiseLikeOfReactNode | Iterable<import("react").ReactNode> | null | undefined; }; body: string | number | boolean | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | import("react").ReactPortal | import("react").PromiseLikeOfReactNode | Iterable<import("react").ReactNode> | null | undefined; created_at: string | number | Date; }, index: any) => import("react").JSX.Element): unknown;
  id: number;
  sender: User; 
  receiver: User;
  uid: string;
  body: string;
  created_at: string;
  sent: boolean;
}

