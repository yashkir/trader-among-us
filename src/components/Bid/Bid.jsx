import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import "./Bid.css";
import Column from "../../components/Column/Column";
import postsApi from "../../utils/posts-api";
import itemsApi from "../../utils/items-api";

const data = {
  items: {
    "itm-1": {
      id: "itm-1",
      name: "item1",
      description: "somedes",
      img: "https://cdn.greatlifepublishing.net/wp-content/uploads/sites/4/2015/10/23150611/coffee-grinder-715170_960_720.jpg"
    },
    "itm-2": {
      id: "itm-2",
      name: "item2",
      description: "somedes",
      img: "https://wl-brightside.cf.tsp.li/resize/728x/jpg/181/4fb/2a0b6e52e29e3ba58697034db7.jpg"
    },
    "itm-3": {
      id: "itm-3",
      name: "item3",
      description: "somedes",
      img: "https://thumbs.dreamstime.com/b/kitchen-antique-items-rural-life-composition-objects-dark-background-194158844.jpg"
    },
  },
  columns: {
    "col-1": {
      id: "col-1",
      title: "Your Items",
      itemIds: ["itm-1", "itm-2", "itm-3"]
    },
    "col-2": {
      id: "col-2",
      title: "Bid Items",
      itemIds: [],
    },
  },
  columnOrder: ["col-1", "col-2"],
};


export default function Bid(props) {
  const userId = props.user._id;

  const [bid, setBid] = useState({
    itemsOffered: [],
    description: ""
  });


  const [message, setMessage] = useState("");

  const loadItems = async () => {
    const res = await itemsApi.show(userId);
    const itemsForDrag = res.item;

    /** here we transform the database array to our object for the dragging
      items = [
        {id: "60c9656bdb21932de0551b9e", name: "WOWOW", img: "2084aec2257e16c1dea5d9054cb1e286"},
      ]
      TO
      itemsHere = {
        "60c9656bdb21932de0551b9e": { id: "60c9656bdb21932de0551b9e", name: "WOWOW", img: "2084aec2257e16c1dea5d9054cb1e286"}
      }
    */

    let itemIds = itemsForDrag.map(item => item._id);
    data.columns["col-1"].itemIds = itemIds;
    itemsForDrag.forEach(item => {
      data.items[item._id] = {
        id: item._id,
        name: item.title,
        img: item.image,
      };
    });
  };

  useEffect(() => {
    loadItems();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!bid.description) {
      setMessage("Please enter a description");
      return;
    } else {
      bid.itemsOffered = items.columns["col-2"].itemIds;
      await postsApi.makeBid(props.postId, bid);
      props.loadPosts();
      handleHidden();
      setMessage("");
    }
  }

  function handleBidChange(e) {
    e.preventDefault();

    setBid({ ...bid, [e.target.name]: e.target.value });
  }

  const [items, setItems] = useState(data);


  const columns = items.columnOrder;

  const [hidden, setHidden] = useState("");
  const [icon, setIcon] = useState("+");
  const [block, setBlock] = useState("");

  const handleHidden = () => {
    if (hidden === "hidden") setHidden("");
    if (hidden === "") setHidden("hidden");
    if (icon === "+") setIcon("-");
    if (icon === "-") setIcon("+");
    if (block === "show-bid-form") setBlock("");
    if (block === "") setBlock("show-bid-form");
  };

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    //Out of bounds
    if (!destination) return;
    //Same Location
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = items.columns[source.droppableId];
    const end = items.columns[destination.droppableId];
    //Moving within same column
    if (start === end) {
      const newItemIds = Array.from(start.itemIds);

      newItemIds.splice(source.index, 1);
      newItemIds.splice(destination.index, 0, draggableId);

      const newStartColumn = {
        ...start,
        itemIds: newItemIds,
      };

      const newState = {
        ...items,
        columns: {
          ...items.columns,
          [newStartColumn.id]: newStartColumn,
        }
      };

      setItems(newState);
      return;
    }

    //Moving to different column
    const startItemIds = Array.from(start.itemIds);
    startItemIds.splice(source.index, 1);
    const newStart = {
      ...start,
      itemIds: startItemIds,
    };

    const endItemIds = Array.from(end.itemIds);
    endItemIds.splice(destination.index, 0, draggableId);
    const newEnd = {
      ...end,
      itemIds: endItemIds,
    };

    const newState = {
      ...items,
      columns: {
        ...items.columns,
        [newStart.id]: newStart,
        [newEnd.id]: newEnd,
      }
    };
    setItems(newState);
  };

  return (
    <>
      <div className="PostIdPage post-page-row">
        <h3 onClick={handleHidden} className="post-btn">Make A Bid</h3>
      </div>

      <div className={"bid-container "}>
        <p className={`txt-area-col ${block}`}>Drag and drop to make a bid</p>
        <div className={`Bid-body-row ${hidden}`}>
          <DragDropContext className="Bid-list" onDragEnd={onDragEnd}>
            {columns.map((colId) => {
              const column = items.columns[colId];
              const res = column.itemIds.map(itemId => items.items[itemId]);
              return <Column key={column.id} column={column} res={res} />;
            })}
          </DragDropContext>
        </div>
        <div className={`txt-area-col ${block}`}>
          <textarea
            className="bid-text-area"
            onChange={handleBidChange}
            value={bid.description}
            style={{ height: "15vh" }}
            placeholder="Now's your chance, make your pitch!"
            name="description"
            id="description"
          />
        </div>
        <div className={`txt-area-col ${block}`}>
          <h3 onClick={handleSubmit} className={"post-btn"}>Confirm Bid</h3>
        </div>
        <h3 className="bid-message">{message}</h3>
      </div>
    </>
  );
}
