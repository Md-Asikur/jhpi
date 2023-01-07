import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Preview } from "@mui/icons-material";
import { useValue } from "../../../context/ContextProvider";
import { clearRoom, deleteRoom } from "../../../actions/room";
import { useNavigate, useParams } from "react-router-dom";
import useFetchDocument from "../../../customHooks/useFetchDocument";
import { useEffect, useState } from "react";

const RoomsActions = ({ params }) => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);

  const { document } = useFetchDocument("teachers", id);
 
  const { imageURL, name, Email, Phone } = params.teacher;

  useEffect(() => {
    setTeacher(document);
  }, [document]);

  const {
    dispatch,
    state: { currentUser, updatedRoom, addedImages, images: newImages },
  } = useValue();

  const navigate = useNavigate();
  const handleEdit = () => {
    if (updatedRoom) {
      clearRoom(dispatch, currentUser, addedImages, updatedRoom);
    } else {
      clearRoom(dispatch, currentUser, newImages);
    }
    dispatch({ type: "UPDATE_LOCATION", payload: {  } });
    dispatch({
      type: "UPDATE_DETAILS",
      payload: {  },
    });
    dispatch({ type: "UPDATE_IMAGES", payload:'' });
    dispatch({ type: "UPDATE_UPDATED_ROOM", payload: {  } });
    dispatch({ type: "UPDATE_SECTION", payload: 2 });
    navigate("/");
  };
  return (
    <Box>
      <Tooltip title="View room details">
        <IconButton
          onClick={() => dispatch({ type: "UPDATE_ROOM", payload: params.teacher })}
        >
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit this room">
        <IconButton onClick={handleEdit}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete this room">
        <IconButton onClick={() => deleteRoom(params.teacher, currentUser, dispatch)}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default RoomsActions;
