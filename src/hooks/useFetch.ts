import { useEffect } from "react";
import { useState } from 'react';

type useFetchProps = {
    url: string;
}

export const useFetch = ({url}: useFetchProps) => {
    
    type RandomUser = {
        name: {
          title: string,
          first: string,
          last: string
        },
        email: string,
        picture: {
          large: string,
          medium: string,
          thumbnail: string
        }
    }

    const [RandomUsers, setRandomUsers] = useState<RandomUser[]>([]);

    useEffect(() => {
        const fetchData = async () => {
    
          try {
            
            const datajson = await fetch(url);
            if (!datajson.ok) throw new Error('Network response was not ok');
      
            const data = await datajson.json();
            
            if (data.results) {
              setRandomUsers(data.results);
            }
    
          } catch (error) {
    
            console.error('Fetch error:', error);
          }
        }
        fetchData();
      }, [url])

      return RandomUsers;
}


