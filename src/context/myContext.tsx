import React, { createContext, useState, ReactNode, useContext, useMemo, useEffect } from 'react';

interface List {
  id: string,
  name: string,
  description: string,
  imageUrl: string,
  createdAt: string
}

interface MyContextType {
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>,
    user: string,
    setUser: React.Dispatch<React.SetStateAction<string>>,
    toDoList: List[],
    setToDoList: React.Dispatch<React.SetStateAction<List[]>>,
    modal: boolean | string,
    setModal: React.Dispatch<React.SetStateAction<boolean | string>>
  }
  
  const defaultState: MyContextType = {
    token: '',
    setToken: () => {},
    user: '',
    setUser: () => {},
    toDoList: [],
    setToDoList: () => {},
    modal: false,
    setModal: () => {},
  };

export const MyContext = createContext<MyContextType>(defaultState);

interface MyProviderProps {
    children: ReactNode;
  }

export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string>(localStorage.getItem("token") ?? '');
    const [user, setUser] = useState<string>('')
    const [toDoList, setToDoList] = useState<List[]>([]);
    const [modal, setModal] = useState<boolean | string>(false);

    useEffect(() => {
      if(token !== ''){
        localStorage.setItem("token", token);
      }
    },[token])

    const memoBrand = useMemo(() => ({token, setToken, user, setUser, toDoList, setToDoList, modal, setModal}),[token, toDoList, modal])


    return (
        <MyContext.Provider value={memoBrand}>
            {children}
        </MyContext.Provider>
    );
};

export const useMyContext = () => useContext(MyContext)