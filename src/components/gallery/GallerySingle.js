import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import placeholder from '../../images/placeholder.png'


// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const GallerySingle = () => {

  const [art, setArt] = useState(null)

  // const apiKey = 'ea65da40-779b-43c2-87a7-1bbc03fef7d6&size=100&page=10'

  const { objectid } = useParams()
  //console.log(objectid)

  useEffect(() => {
    const getArt = async () => {
      try {
        const { data } = await axios.get(`https://api.harvardartmuseums.org/object/${objectid}?apikey=${process.env.REACT_APP_API_KEY}`)
        setArt(data)
        //console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getArt()
  }, [objectid])


  return (
    <main>
      <Container>
        <Row>
          <Col xs="12">
            <h1 id='title' className='display-4 mt-4 mb-5 text-center'>Gallery</h1>
          </Col>
          {art &&
            <>
              <Col>
                <img className='singleImage' src={art.images && art.images[0] && art.images[0].baseimageurl ? art.images[0].baseimageurl : placeholder} alt={art.people.name} />
              </Col>
              <Col md="6" className='singleText mt-3 col-md-6'>
                <h4 className='display-6'>{art.people[0].name}, </h4>
                <p className='display-7'> {art.people[0].culture} {art.people[0].displaydate}</p>
                <hr /><br />
                <p className='singleTitle' >{art.title}</p>
              </Col>
            </>
          }
        </Row>
      </Container>
    </main>
  )
}

export default GallerySingle