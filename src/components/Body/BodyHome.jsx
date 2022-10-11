import Card from 'react-bootstrap/Card';
import bannerDumbsound from '../../assets/bannerDumbsound.png'
import PlayListUser from "./PlayListUser"

function BodyHome() {

    return(
    <div>
        <Card style={{backgroundColor: "black"}}>
        <Card.Img src={bannerDumbsound}  alt="Card image" style= {{width:"100vw", height:"50vw"}} />
        <Card.ImgOverlay style={{justifyContent:"center", alignItems:"center", textAlign:"center"}}>
          <Card.Title> <h1 className="ms-5" style={{marginTop: "200px"}}>Connect on DumbSound</h1> </Card.Title>
          <Card.Text className="text-justify-center ms-5 text-light fw-semibold" >
          Discovery, Strem, and share a constantly expanding mix of music <br /> from emerging and major artists around the world
          </Card.Text>
          </Card.ImgOverlay>
      </Card>

    <PlayListUser />
    </div>

    )
}

export default BodyHome
