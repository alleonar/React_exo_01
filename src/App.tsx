import { useState } from 'react';

import './App.css';

// Bootstrap.
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap';
import { useFetch } from './hooks/UseFetch';

function App() {

  const RandomUsers = useFetch({url: "https://randomuser.me/api/?results=10"})

  const [isExtended, setIsExtended] = useState<string[]>([]);

  const HandleExtend = (email: string) => {

    if (isExtended.includes(email)) {

      setIsExtended((isExtended) => 
        isExtended.filter(email => email !== email))

    } else {

      setIsExtended([...isExtended, email])
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
        {RandomUsers.map((randomUser)=> 
          {
            if (isExtended.length === 0 || isExtended.includes(randomUser.email)) {
              return (
                <Card key={randomUser.email} className="card border-primary m-3" style={{width: '15rem'}}>
    
                  <Card.Img src={randomUser.picture.large}/>
    
                  {isExtended.includes(randomUser.email) ? (
                    <div className='userInfos'>
                      <p>{randomUser.name.title}</p>
                      <p>{randomUser.name.first}</p>
                      <p>{randomUser.name.last}</p>
                      <p>{randomUser.email}</p>
                    </div>
                  ): ''}
    
                  <Button onClick={() => HandleExtend(randomUser.email)} className="mt-3 primary">
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
