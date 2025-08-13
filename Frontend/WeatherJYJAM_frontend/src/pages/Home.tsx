import { useParams, useNavigate } from 'react-router-dom'
import Button from '../components/Button'

const Home = () => {
  const { tabId } = useParams()
  const navigate = useNavigate()

  return (
    <div>
      <h1>Home Map {tabId ? `- Tab: ${tabId}` : ''}</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <Button onClick={() => navigate('/tab1')}>tab1</Button>
        <span style={{ margin: '0 10px' }}></span>
        <Button onClick={() => navigate('/tab2')}>+</Button>
      </div>
      
      <Button>Home</Button>
    </div>
  )
}

export default Home
