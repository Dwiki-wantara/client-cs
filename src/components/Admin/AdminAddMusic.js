
import React, { useState, useEffect } from "react";
import "../AddMusic.css";
import { Form, Container, Button } from "react-bootstrap";
import { AiOutlinePaperClip } from "react-icons/ai";
import { API } from "../../config/api";
import { useNavigate } from "react-router";
import NavbarAdmin from "../Navbar/NavbarAdmin"

function AddMusicForm() {
  let navigate = useNavigate();
  const [message, setMessage] = useState();
  const [singer, setSinger] = useState([]);

  const [form, setForm] = useState({
        title: "",
        year: "",
        artistId: "",
        image:"",
        song:"",
  });

  const [preview, setPreview] = useState();
  const [audio, setAudio] = useState();
  const { title, year } = form;

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.type === "file" && e.target.name === "thumbnailMusic") {
      const url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
    if (e.target.type === "file" && e.target.name === "attache") {
      setAudio(e.target.files[0].name);
    }
  };

  const handleOnChangeOptionSinger = (e) => {
    console.log(e.target.value);
    setForm({
      ...form,
      artistId: e.target.value,
    });
  };
  console.log(form);

  const loadSinger = async () => {
    try {
      const response = await API.get("/artis");
      // console.log(response);
      setSinger(response.data.data);

      console.log(singer);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("year", form.year);
      formData.set("artis_id", form.artistId);
      formData.set("thumbnailMusic", form.image[0], form.image[0].name);
      formData.set("attache", form.song[0], form.song[0].name);
    
      const response = await API.post("/music", formData, config);
      if (response.status == 200) {
        setMessage("Successfully Added Song");
      }

      setPreview("");
      setAudio("");

      navigate("/admin/music");

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadSinger();
  }, []);

  console.log(preview);
  console.log(form);
  console.log(message);

  return (
    <div className="song-page">
    <NavbarAdmin/>
      <div className="table-container-song ">
        <div className="container-text-and-form">
          {message && (
            <div class="alert alert-success message-success-music" role="alert">
              {message}
            </div>
          )}
          <h1 className="text-incoming"> Add Music</h1>
          {/* {preview && (
            <div className="container-cover-song">
              <img src={preview} className="cover-preview" alt="preview-pict" />
            </div>
          )} */}
          <Form
            className="form-song"
            onSubmit={handleOnSubmit}
            // onSubmit={(e) => {
            //   e.preventDefault();
            //   handleOnSubmit();
            // }}
          >
            <Form.Group className="mb-3" controlId="text">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Form.Control
                  className="bg-dark text-light input-form-music"
                  size="lg"
                  type="text"
                  name="title"
                  placeholder="Title"
                  bordered
                  // required
                  onChange={onChange}
                />

                <div>
                  <label className="label-input-cover">
                    Attach Thumbnail{" "}
                    <AiOutlinePaperClip
                      size="2em"
                      style={{ color: "#ee4622" }}
                    />
                    <input type="file" name="image" onChange={onChange} />
                  </label>
                </div>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="text">
              <Form.Control
                className="bg-dark text-light input-form-music"
                size="lg"
                type="number"
                name="year"
                placeholder="Year"
                bordered
                // required
                onChange={onChange}
              />
            </Form.Group>

            <Form.Control
              as="select"
              size="lg"
              className="mr-sm-2 mb-3 bg-dark text-light form-input-type-music"
              id="inlineFormCustomSelect"
              custom
              onChange={handleOnChangeOptionSinger}
            >
              <option value="0">Singer</option>
              {singer.map((arr, index) => (
                <option key={index} value={arr.id} name={arr.id}>
                  {arr.name}
                </option>
              ))}
            </Form.Control>

            <div style={{ display: "flex", justifyContent: "start" }}>
              <label className="label-input-song">
                Attach
                <input type="file" name="song" onChange={onChange} />
              </label>
            
            </div>
            <Container className="button-container-artist" style={{marginLeft:"400px"}}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="button-submit-artist"
              >
                Add Song
              </Button>
            </Container>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddMusicForm;

