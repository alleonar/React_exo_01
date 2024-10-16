import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';

// Bootstrap.
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap';

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


function App() {

  const [RandomUsers, setRandomUsers] = useState<RandomUser[]>([]);
  const [isExtended, setIsExtended] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {

      const datajson = await fetch("https://randomuser.me/api/?results=10");
      const data = await datajson.json();

      if (data.results) {
        setRandomUsers(data.results);
      }
    }
    fetchData();
  }, [])

  const HandleExtend = (randomUser: RandomUser) => {
    if (isExtended.includes(randomUser.email)) {
      setIsExtended((isExtended) => 
        isExtended.filter(email => email !== randomUser.email))
    } else {
      setIsExtended([...isExtended, randomUser.email])
    }
  }

  return (
    <>
      <header className="py-1">
          <div className="container px-lg-3">
              <div className="p-4 p-lg-5 rounded-3 text-center">
                  <div className="m-2 m-lg-3">
                      <h1 className="display-5 fw-bold">A warm welcome!</h1>
                      <p className="fs-4">Discover our team and feel free to contact us!</p>
                  </div>
              </div>
          </div>
      </header>
      <div className="d-flex flex-wrap py-5 mx-auto justify-content-center" style={{width: '100%'}}>
        {RandomUsers.map((randomUser: RandomUser)=> 
          {
            if (isExtended.length === 0 || isExtended.includes(randomUser.email)) {
              return (
                <Card className="card border-primary m-3" style={{width: '15rem'}}>
    
                  <img src={randomUser.picture.large}/>
    
                  {isExtended.includes(randomUser.email) ? (
                    <div className='userInfos'>
                      <p>{randomUser.name.title}</p>
                      <p>{randomUser.name.first}</p>
                      <p>{randomUser.name.last}</p>
                      <p>{randomUser.email}</p>
                    </div>
                  ): ''}
    
                  <Button onClick={() => HandleExtend(randomUser)} className="mt-3 primary">
                    {isExtended.includes(randomUser.email) ? 'Less' : 'More'}
                  </Button>
                </Card>
              );
            }
            
            return null;
          }
        )}
      </div>
    </>
  )
}

export default App
