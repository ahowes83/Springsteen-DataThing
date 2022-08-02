import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import './EditorPane.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function EditorPane(props) {

  const [title, setTitle] = useState('');
  const [items, setItems] = useState();
  const [lyrics, updateLyrics] = useState();

  const dispatch = useDispatch();
  const linesStore = useSelector(store => store.savedLines);
  const userStore = useSelector(store => store.user);
  const history = useHistory();

  console.log('store', useSelector(store => store));

  const userID = userStore.id;

  useEffect(() => {
    setTimeout(() => {
      dispatch({type: 'FETCH_CREATION', userID});    //, payload: userStore['id']
    }, 3000)
  }, []);

  function handleOnDragEnd(result) {
    const items = Array.from(lyrics);
    const [reorderedItem] = item.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log(result);

    updateLyrics(items);
  }

  const deleteLine = (userID, lineID) =>{
    let lineToDelete = {
      user_id: userID,
      fragment_id: lineID
    }
    console.log('sent request to delete line:', lineToDelete);
    dispatch({type: 'TRIGGER_DELETE_CREATION', payload: lineToDelete});
  }

  // onDragEnd = result => {

  // }

  const setNewTitle = event => {
    setTitle(event.target.value);
  }

  return (
    <div id="savedLinesBox">
      <h1 className="linesCap">EDITOR</h1>
      {linesStore.length === 0 || userStore.length === 0? (<p>...Loading...</p>) : (
      <section><div id="linesBox">
                                                                        {/* onDragEnd={this.onDragEnd} */}
        <input id="titleInput" onChange={setNewTitle} placeholder="Song Title"></input>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="DroppableIdForEditorList">
          {(provided) => (
            <ul id="lineList" {...provided.droppableProps} ref={provided.innerRef}>
              {linesStore.map((line, index) => {
                let lineKey = line.fragment_id + 'b';
                return (
                  <Draggable key={lineKey} draggableId={lineKey} index={index}>{(provided) => (<div ref={provided.innerRef} {...provided.draggableProps}{...provided.dragHandleProps}><li>{line.fragment_text}<button className="deleteButton" onClick={()=>{deleteLine(userStore.id, line.fragment_id)}}>⊖</button></li></div>)}</Draggable>
                )
              })}
              </ul>
              )}
          </Droppable>
        </DragDropContext>
      </div></section>)}
    </div>
  );
}

export default EditorPane;
