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

    const [randomUsers, setRandomUsers] = useState<RandomUser[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {

            setLoading(true);
    
          try {

            const datajson = await fetch(url);
            if (!datajson.ok) throw new Error('Network response was not ok');
      
            const data = await datajson.json();

            console.log(datajson)
            
            if (data.results) {
              setRandomUsers(data.results);
            }
    
          } catch (error) {
    
            console.error('Fetch error:', error);
          } finally {

            setLoading(false)
          }
        }
        fetchData();
      }, [url])

      return { randomUsers, loading };
}


