import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import placeholder from '../../images/placeholder.png'


import Error from '../common/Error'
import Spinner from '../common/Spinner'

// Bootstrap Components
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'


const GalleryIndex = () => {

  const [art, setArt] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const getArt = async () => {
      try {
        const { data } = await axios.get(`https://api.harvardartmuseums.org/object?apikey=${process.env.REACT_APP_API_KEY}&size=50`)
        setArt(data.records)
        console.log(data.records)
      } catch (err) {
        //console.log(err)
        setError(err.message)
      }
    }
    getArt()
  }, [])


  return (
    <main>
      <Container>
        <Row>
          <Col xs="12">
            <h1 id='title' className='display-4 mt-4 mb-5 text-center'>Gallery</h1>
          </Col>
          {art.length > 0 ?
            art.filter(art => {
              //console.log(art.people && art.images && art.images[0] && art.images[0].baseimageurl)
              return art.people
            }).map(art => {
              const { id, people, images } = art
              console.log(images)
              return (
                <Col key={id} lg="4" md="6" sm="12" className='art'>
                  <Link to={`/gallery/${id}`}>
                    <Card>
                      <div className="card-image" style={{ backgroundImage: `url('${images && images[0] && images[0].baseimageurl ? images[0].baseimageurl : placeholder}')` }}></div>

                      <Card.Body>
                        <Card.Text>{people[0].name}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              )
            })
            : (
              <>
                {error ?
                  <Error error={error} />
                  :
                  <Spinner />}
              </>
            )}
        </Row>
      </Container>
    </main>
  )
}
export default GalleryIndex